import { createUserRepository } from "./user.repository.factory";
import { UserRepository } from "./user.repository";
import { Observable, of } from "rxjs";
import { switchMap, map, flatMap } from "rxjs/operators";
import { User } from "./user";
import { shapeUsersResponse } from "./user.response.shaper";
import { Result } from "../../result.success";
import { Credential } from "../../authentication/credential/credential";
import { generate } from "generate-password";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { PartyAccessRole } from "../../authorization/party-access-role/party.access.role";
import { PartyAccessRoleRepository } from "../../authorization/party-access-role/party.access.role.repository";
import { createPartyAccessRoleRepositoryFactory } from "../../authorization/party-access-role/party.access.role.repository.factory";
import { UserResponse } from "./user.response";
import { AccessRoleRepository } from "../../authorization/access-role/access.role.repository";
import { createAccessRoleRepositoryFactory } from "../../authorization/access-role/access.role.repository.factory";
import { AccessRole } from "../../authorization/access-role/access.role";
import { CredentialRepository} from "../../authentication/credential/credential.repository";
import { createCredentialRepositoryFactory } from "../../authentication/credential/credential.repository.factory";

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
        .pipe(flatMap(value => {
          return this.userRepository
            .getUserCount()
            .pipe(map(count => {
              const shapeUsersResp: any = shapeUsersResponse(value, number, size, value.length, count, sort);
              return new Result<any>(false, "users", shapeUsersResp);
            }));
        }));
    }

  getUser (partyId: string): Observable<UserResponse> {
      return this.userRepository.getUser(partyId)
          .pipe(switchMap(user => {
              if (!user) return of(undefined);
              return this.partyAccessRoleRepository.getPartyAccessRoleById(partyId)
                  .pipe(switchMap((partyAccessRoles: PartyAccessRole[]) => {
                      if (partyAccessRoles.length < 1) return of(new UserResponse(user));
                      const accessRoleIds: string[] = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId; });
                      if (accessRoleIds.length < 1)  return of(new UserResponse(user, partyAccessRoles));
                      return this.accessRoleRepository.getAccessRoleByIds(accessRoleIds)
                          .pipe(map( accessRoles => {
                             if (accessRoles.length < 1) return new UserResponse(user, partyAccessRoles);
                              partyAccessRoles.forEach( value => {
                                  const index = accessRoles.findIndex(x => x.accessRoleId === value.accessRoleId);
                                  value.accessRole = index !== -1 ? accessRoles[index] : new AccessRole();
                              });
                              return new UserResponse(user, partyAccessRoles);
                          }));
                  }));
          }));
    }

  saveUser (user: User, partyAccessRoles: PartyAccessRole[]): Observable<User> {
      const credential = JSON.parse(JSON.stringify(new Credential().toJson()));
      credential.username = user.username;
      credential.password = generate({
          length: 10,
          numbers: true
      });
      return this.credentialRepository.addCredential(credential)
          .pipe(switchMap( credentialRes => {
             if (!credentialRes) return of(undefined);
             user.username = undefined;
             user.partyId = credentialRes.credential.partyId;
              return this.userRepository.saveUser(user)
                  .pipe(switchMap( userRes => {
                      if (!userRes) return of(undefined);
                      partyAccessRoles.forEach( value => {
                         value.partyId = userRes.partyId;
                      });
                      return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
                          .pipe(map( partyAccessRolesRes => {
                             if (!partyAccessRolesRes) return undefined;
                             return userRes;
                          }));
                  }));
          }));
  }

  deleteUser (partyId: string): Observable<number> {
       return this.userRepository.deleteUser(partyId)
         .pipe(switchMap(value => {
           if (!value) {
             return of(value);
           } else {
             return this.partyAccessRoleRepository.deletePartyAccessRole(partyId);
               // .pipe(switchMap(numRemoved => {
               //   return this.credentialRepository.deleteCredentialByPartyId(partyId);
               // });
           }
         }));
    }

  updateUser (partyId: string, user: User, partyAccessRoles: PartyAccessRole[]): Observable<number> {
      user.username = undefined;
       return this.userRepository.updateUser(partyId, user)
         .pipe(switchMap(numUpdated => {
           if (!numUpdated) return of(undefined);
           return this.partyAccessRoleRepository.deletePartyAccessRole(partyId)
              .pipe(switchMap(numRemoved => {
                  if (!numRemoved) return of(undefined);
                  return this.partyAccessRoleRepository.addPartyAccessRole(partyAccessRoles)
                      .pipe(map(next => {
                          if (!next) return undefined;
                          return numUpdated;
                      }));
             }));
         }));
    }

  updateUserMe (partyId: string, user: User, credential: Credential): Observable<number> {
    return this.userRepository.updateUser(partyId, user)
      .pipe(switchMap(numUpdated => {
        // if (numUpdated) {
        //   return this.credentialRepository.updateCredential(partyId, credential);
        // }else {
          return of(0);
        // }
      }));
  }

}
