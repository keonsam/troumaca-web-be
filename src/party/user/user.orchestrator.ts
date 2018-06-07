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
//import  generatePassword from 'password-generator';
import {generate} from "generate-password";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {PartyAccessRole} from "../../authorization/party-access-role/party.access.role";
import {PartyAccessRoleRepository} from "../../authorization/party-access-role/party.access.role.repository";
import {createPartyAccessRoleRepositoryFactory} from "../../authorization/party-access-role/party.access.role.repository.factory";

export class UserOrchestrator {

  private userRepository:UserRepository;
  private credentialRepository: CredentialRepository;
  private partyAccessRoleRepository: PartyAccessRoleRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.partyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
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

    getUser (partyId:string):Observable<User> {
      return this.userRepository.getUser(partyId);
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
