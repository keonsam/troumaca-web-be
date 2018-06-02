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
  private credential: Credential;
  private partyAccessRoleRepository: PartyAccessRoleRepository;

  constructor() {
    this.credential = new Credential();
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

     saveUser (user:User, partyAccessRoles:PartyAccessRole[]): Observable<Result<any>> {
       return this.userRepository.saveUser(user)
         .switchMap(user => {
           if (!user) {
             return Observable.of(new Result<any>(true, "users", user));
           } else {
             partyAccessRoles.forEach( value => {
               value.partyId = user.partyId;
             });
             return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
               .switchMap(partyAccessRole => {
                 if (partyAccessRole.length === 0) {
                   return Observable.of(new Result<any>(true, "users", user));
                 } else {
                   this.credential.partyId = user.partyId;
                   this.credential.username = user.username;
                   this.credential.password = generate({ // upgraded to a new module https://www.npmjs.com/package/generate-password
                     length: 10,
                     numbers: true
                   });
                   this.credential.credentialStatus = CredentialStatus.ACTIVE;
                   return this.credentialRepository.addUserCredential(this.credential)
                     .map(credential => {
                       if (!credential) {
                         return new Result<any>(true, "credential", credential);
                       } else {
                         return new Result<any>(false, "credential", user);
                       }
                     });
                 }
               });
           }
         });
     };

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
