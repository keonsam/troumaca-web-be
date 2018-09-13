import { createUserRepository } from "../../adapter/party/user.repository.factory";
import { UserRepository } from "../../repository/user.repository";
import { Observable } from "rxjs/Observable";
import { User } from "../../data/party/user";
import { shapeUsersResponse } from "./user.response.shaper";
import { Result } from "../../result.success";
import { Credential } from "../../data/authentication/credential";
import { generate } from "generate-password";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { PartyAccessRole } from "../../data/authorization/party.access.role";
import { PartyAccessRoleRepository } from "../../repository/party.access.role.repository";
import { createPartyAccessRoleRepositoryFactory } from "../../adapter/authorization/party.access.role.repository.factory";
import { UserResponse } from "../../data/party/user.response";
import { AccessRoleRepository } from "../../repository/access.role.repository";
import { createAccessRoleRepositoryFactory } from "../../adapter/authorization/access.role.repository.factory";
import { AccessRole } from "../../data/authorization/access.role";
import { CredentialRepository} from "../../repository/credential.repository";
import { createCredentialRepositoryFactory } from "../../adapter/authentication/credential.repository.factory";

export class UserOrchestrator {

  private userRepository: UserRepository;
  private credentialRepository: CredentialRepository;
  private partyAccessRoleRepository: PartyAccessRoleRepository;
  private accessRoleRepository: AccessRoleRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.partyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
  }


  findUser(searchStr: string, pageSize: number): Observable<User[]> {
    return this.userRepository.findUser(searchStr, pageSize);
  }

  getUsers (number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.userRepository.getUsers(number, size, sort)
    .flatMap(value => {
      return this.userRepository
        .getUserCount()
        .map(count => {
          const shapeUsersResp: any = shapeUsersResponse(value, number, size, value.length, count, sort);
          return new Result<any>(false, "users", shapeUsersResp);
        });
    });
  }

  getUser (partyId: string): Observable<UserResponse> {
      return this.userRepository.getUser(partyId)
      .switchMap(user => {
          if (!user) return Observable.of(undefined);
          return this.partyAccessRoleRepository.getPartyAccessRoleById(partyId)
          .switchMap((partyAccessRoles: PartyAccessRole[]) => {
              if (partyAccessRoles.length < 1) return Observable.of(new UserResponse(user));
              const accessRoleIds: string[] = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId; });
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
    }

  saveUser (user: User, partyAccessRoles: PartyAccessRole[]): Observable<User> {
      const credential = JSON.parse(JSON.stringify(new Credential().toJson()));
      credential.username = user.username;
      credential.password = generate({
          length: 10,
          numbers: true
      });
      return this.credentialRepository.addCredential(credential)
      .switchMap( credentialRes => {
         if (!credentialRes) return Observable.of(undefined);
         user.username = undefined;
         user.partyId = credentialRes.credential.partyId;
          return this.userRepository.saveUser(user)
          .switchMap( userRes => {
              if (!userRes) return Observable.of(undefined);
              partyAccessRoles.forEach( value => {
                 value.partyId = userRes.partyId;
              });
              return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
              .map( partyAccessRolesRes => {
                 if (!partyAccessRolesRes) return undefined;
                 return userRes;
              });
          });
      });
  }

  deleteUser (partyId: string): Observable<number> {
     return this.userRepository.deleteUser(partyId)
     .switchMap(value => {
       if (!value) {
         return Observable.of(value);
       } else {
         return this.partyAccessRoleRepository.deletePartyAccessRole(partyId);
           // .switchMap(numRemoved => {
           //   return this.credentialRepository.deleteCredentialByPartyId(partyId);
           // });
       }
     });
  }

  updateUser (partyId: string, user: User, partyAccessRoles: PartyAccessRole[]): Observable<number> {
      user.username = undefined;
     return this.userRepository.updateUser(partyId, user)
     .switchMap(numUpdated => {
       if (!numUpdated) return Observable.of(undefined);
       return this.partyAccessRoleRepository.deletePartyAccessRole(partyId)
        .switchMap(numRemoved => {
            if (!numRemoved) return Observable.of(undefined);
            return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
            .map(next => {
                if (!next) return undefined;
                return numUpdated;
            });
       });
     });
  }

  updateUserMe (partyId: string, user: User, credential: Credential): Observable<number> {
    return this.userRepository.updateUser(partyId, user)
      .switchMap(numUpdated => {
        // if (numUpdated) {
        //   return this.credentialRepository.updateCredential(partyId, credential);
        // }else {
          return Observable.of(0);
        // }
      });
  }

}
