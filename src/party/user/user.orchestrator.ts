import {createUserRepository} from "../../adapter/party/user.repository.factory";
import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import {Observable, of, throwError} from "rxjs";
import {switchMap, map, flatMap} from "rxjs/operators";
import {shapeUsersResponse} from "./user.response.shaper";
import {Result} from "../../result.success";
import {Credential} from "../../data/authentication/credential";
import {generate} from "generate-password";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {PartyAccessRole} from "../../data/authorization/party.access.role";
import {PartyAccessRoleRepository} from "../../repository/party.access.role.repository";
import {createPartyAccessRoleRepositoryFactory} from "../../adapter/authorization/party.access.role.repository.factory";
import {AccessRoleRepository} from "../../repository/access.role.repository";
import {createAccessRoleRepository} from "../../adapter/authorization/access.role.repository.factory";
import {CredentialRepository} from "../../repository/credential.repository";
import {createCredentialRepositoryFactory} from "../../adapter/authentication/credential.repository.factory";
import {SessionRepository} from "../../repository/session.repository";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";
import {Person} from "../../data/party/person";

export class UserOrchestrator {

    private userRepository: UserRepository;
    private credentialRepository: CredentialRepository;
    private partyAccessRoleRepository: PartyAccessRoleRepository;
    private accessRoleRepository: AccessRoleRepository;
    private sessionRepository: SessionRepository;

    constructor() {
        this.userRepository = createUserRepository();
        this.credentialRepository = createCredentialRepositoryFactory();
        this.partyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
        this.accessRoleRepository = createAccessRoleRepository();
        this.sessionRepository = createSessionRepositoryFactory();
    }


    findUser(searchStr: string, pageSize: number): Observable<User[]> {
        return this.userRepository.findUser(searchStr, pageSize);
    }

    getUsers(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
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

    getUser(partyId: any): Observable<User> {
        return this.userRepository.getUser(partyId)
            .pipe(switchMap(user => {
                if (!user) {
                    return throwError(`Failed to get user ${partyId} ${user}`);
                } else {
                    return this.partyAccessRoleRepository.getPartyAccessRolesByPartyId(partyId)
                        .pipe(map((partyAccessRoles: PartyAccessRole[]) => {
                            user.partyAccessRoles = partyAccessRoles;
                            return user;
                            // if (partyAccessRoles.length < 1) {
                            //     // error below should return an error if no party access role/s is found but,
                            //     // un-invited user which request join access can't automatically have the role of admin
                            //     // skip for now
                            //     // return throwError(`No PartyAccessRoles found ${partyAccessRoles}`);
                            //     throw new Error(`Failed to get party access roles ${partyAccessRoles}`);
                            // } else {
                            //     user.partyAccessRoles = partyAccessRoles;
                            //     return user;
                            // }
                        }));
                }
            }));
    }

  saveUser(person: Person, credential: Credential, partyAccessRoles: string[]): Observable<User> {
    credential.password = generate({length: 10, numbers: true});
    // This present a problem after the user confirm the account.
    // We will need to either make them active in the confirmation process or just make them active here.
    // or they will be sent to the join / create organization page.
    return this.credentialRepository.addCredential(person, credential)
      .pipe(switchMap(credentialRes => {
        if (!credentialRes) {
          return throwError(`Credential was not created ${credentialRes}`);
        } else {
          person.partyId = credentialRes.credential.partyId;
          return this.userRepository.saveUser(person)
            .pipe(switchMap(userRes => {
              if (!userRes) {
                return throwError(`User not created ${userRes}`);
              } else {
                return this.partyAccessRoleRepository.addPartyAccessRoles(partyAccessRoles, userRes.partyId)
                  .pipe(map(partyAccessRolesRes => {
                    if (!partyAccessRolesRes) {
                      throw new Error(`Failed to add PartyAccessRoles ${partyAccessRolesRes}`);
                    } else {
                      return userRes;
                    }
                  }));
              }
            }));
        }
      }));
  }

    updateUser(partyId: string, user: User, credential: Credential, partyAccessRoles: string[]): Observable<number> {
        return this.userRepository.updateUser(partyId, user)
            .pipe(switchMap(numUpdated => {
                if (!numUpdated) {
                    return throwError(`No User found to update ${numUpdated}`);
                } else {
                    return this.partyAccessRoleRepository.updatePartyAccessRoles(partyAccessRoles, partyId)
                        .pipe(map(partyAccessRolesRes => {
                            if (!partyAccessRolesRes) {
                                throw new Error(`updatePartyAccessRoles Failed ${partyAccessRolesRes}`);
                            } else {
                                // update of the credential needed
                                return numUpdated + partyAccessRoles.length;
                            }
                        }));
                }
            }));
    }

    updateUserMe(partyId: string, user: User, credential: Credential): Observable<number> {
        delete user.username;
        return this.userRepository.updateUser(partyId, user);
            // .pipe(switchMap(numUpdated => {
            //     if (!numUpdated) {
            //         return throwError(`No Profile found to update ${numUpdated}`);
            //     } else {
            //         // TODO : separate this in the future if needed
            //         return this.credentialRepository.updateCredential(partyId, credential)
            //             .pipe( map( numUpdated2 => {
            //                 if (!numUpdated2) {
            //                     throw new Error(`updateUserCredential Failed ${numUpdated2}`);
            //                 } else {
            //                     return numUpdated;
            //                 }
            //             }));
            //     }
            // }));
    }

    deleteUser(partyId: string): Observable<number> {
        return this.userRepository.deleteUser(partyId)
            .pipe(switchMap(value => {
                if (!value) {
                    return throwError(`No User found ${value}`);
                } else {
                    return this.credentialRepository.deleteCredentialByPartyId(partyId)
                        .pipe( switchMap( numRep => {
                            if (!numRep) {
                                return throwError( `Credential not deleted  ${numRep}`);
                            } else {
                                return this.partyAccessRoleRepository.deletePartyAccessRoles(partyId)
                                    .pipe( map( numRep2 => {
                                        if (!numRep2) {
                                            throw new Error(`Failed to delete Party Access Roles ${numRep2}`);
                                        } else {
                                            return value;
                                        }
                                    }));
                            }
                        }));
                }
            }));
    }
}
