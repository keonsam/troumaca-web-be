import {createUserRepository} from './user.repository.factory';
import {UserRepository} from "./user.repository";
import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {shapeUsersResponse} from "./user.response.shaper";
import {Result} from "../../result.success";
import {CredentialRepository} from "../../authentication/credential/credential.repository";
import {createCredentialRepositoryFactory} from "../../authentication/credential/credential.repository.factory";
import {Credential} from "../../authentication/credential/credential";
import {CredentialStatus} from "../../authentication/credential/credential.status";
import {generate} from "generate-password";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {PartyAccessRole} from "../../authorization/party-access-role/party.access.role";
import {PartyAccessRoleRepository} from "../../authorization/party-access-role/party.access.role.repository";
import {createPartyAccessRoleRepositoryFactory} from "../../authorization/party-access-role/party.access.role.repository.factory";
import {UserResponse} from "./user.response";
import {AccessRoleRepository} from "../../authorization/access-role/access.role.repository";
import {createAccessRoleRepositoryFactory} from "../../authorization/access-role/access.role.repository.factory";
import {AccessRole} from "../../authorization/access-role/access.role";

export class UserOrchestrator {

  private userRepository:UserRepository;
  private credentialRepository: CredentialRepository;
  private partyAccessRoleRepository: PartyAccessRoleRepository;
  private accessRoleRepository: AccessRoleRepository;
  constructor() {
    this.userRepository = createUserRepository();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.partyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
  }


  findUser(searchStr:string, pageSize:number):Observable<User[]> {
    return this.userRepository.findUser(searchStr, pageSize);
  }

    getUsers (number:number, size:number, field:string, direction:string):Observable<Result<any>> {
      let sort = getSortOrderOrDefault(field, direction);
      return this.userRepository.getUsers(number, size, sort)
        .flatMap(value => {
          return this.userRepository
            .getUserCount()
            .map(count => {
              let shapeUsersResp:any = shapeUsersResponse(value, number, size, value.length, count, sort);
              return new Result<any>(false, "users", shapeUsersResp);
            });
        });
    };

    getUser (partyId:string):Observable<UserResponse> {
      return this.userRepository.getUser(partyId)
          .switchMap(user => {
              if (!user) return Observable.of(undefined);
              return this.partyAccessRoleRepository.getPartyAccessRoleById(partyId)
                  .switchMap((partyAccessRoles: PartyAccessRole[]) => {
                      if (partyAccessRoles.length < 1) return Observable.of(new UserResponse(user));
                      const accessRoleIds: string[] = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId});
                      if (accessRoleIds.length < 1)  return Observable.of(new UserResponse(user, partyAccessRoles));
                      return this.accessRoleRepository.getAccessRoleByIds(accessRoleIds)
                          .map( accessRoles => {
                             if (accessRoles.length < 1) return new UserResponse(user, partyAccessRoles);
                              partyAccessRoles.forEach( value => {
                                  const index = accessRoles.findIndex(x => x.accessRoleId === value.accessRoleId);
                                  value.accessRole = index !== -1 ? accessRoles[index] : new AccessRole();
                              });
                              return new UserResponse(user, partyAccessRoles);
                          });
                  });
          });
    };


     saveUser (user:User, partyAccessRoles:PartyAccessRole[]): Observable<User> {
         return this.userRepository.saveUser(user)
             .switchMap(user => {
                 if (!user) return Observable.of(user);
                 let credential: Credential = new Credential();
                 credential.partyId = user.partyId;
                 credential.username = user.username;
                 credential.password = generate({
                     length: 10,
                     numbers: true
                 });
                 credential.credentialStatus = CredentialStatus.ACTIVE;
                 return this.credentialRepository.addUserCredential(credential)
                     .switchMap(credential => {
                         if (!credential) return Observable.of(undefined);
                         if (partyAccessRoles.length < 1) return Observable.of(user);
                         partyAccessRoles.forEach(value => {
                             value.partyId = user.partyId;
                         });
                         return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
                             .map(partyAccessRoles2 => {
                                 if (partyAccessRoles2.length === 0) return undefined;
                                 return user;
                             });
                     });
             });
     }

    deleteUser (partyId:string):Observable<number> {
       return this.userRepository.deleteUser(partyId)
         .switchMap(value => {
           if(!value) {
             return Observable.of(value);
           }else {
             return this.partyAccessRoleRepository.deletePartyAccessRole(partyId)
               .switchMap(numRemoved => {
                 return this.credentialRepository.deleteCredentialByPartyId(partyId);
               });
           }
         });
    };

    updateUser (partyId:string, user:User, partyAccessRoles:PartyAccessRole[]):Observable<number> {
       return this.userRepository.updateUser(partyId, user)
         .switchMap(numUpdated => {
           if (numUpdated) {
             return this.partyAccessRoleRepository.deletePartyAccessRole(partyId)
               .switchMap(numRemoved => {
                 return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
                   .map(next => {
                     return numUpdated;
                   });
               });
           }else {
             return Observable.of(0);
           }
         });
    };

  updateUserMe (partyId:string, user:User, credential:Credential):Observable<number> {
    return this.userRepository.updateUser(partyId, user)
      .switchMap(numUpdated => {
        if (numUpdated) {
          return this.credentialRepository.updateCredential(partyId, credential);
        }else {
          return Observable.of(0);
        }
      });
  };

}
