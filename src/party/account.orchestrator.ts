import { createUserRepository } from "../adapter/party/user.repository.factory";
import { createOrganizationRepository } from "../adapter/party/organization.repository.factory";
import { createSessionRepositoryFactory } from "../adapter/session/session.repository.factory";
import { UserRepository } from "../repository/user.repository";
import { OrganizationRepository } from "../repository/organization.repository";
import { User } from "../data/party/user";
import { Session } from "../data/session/session";
import { SessionRepository } from "../repository/session.repository";
import { Organization } from "../data/party/organization";
import { AccountResponse } from "../data/party/account.response";
import { CredentialRepository } from "../repository/credential.repository";
import { createCredentialRepositoryFactory } from "../adapter/authentication/credential.repository.factory";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

export class AccountOrchestrator {

  private userRepository: UserRepository;
  private organizationRepository: OrganizationRepository;
  private sessionRepository: SessionRepository;
  private credentialRepository: CredentialRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  saveAccount (user: User, organization: Organization, sessionId: string): Observable<AccountResponse> {
    // accountType not used in this current set up. you may find it of use in the future. I left it as is.
    //   return this.sessionRepository.getSessionById(sessionId)
    //       .pipe(switchMap((session: Session) => {
    //           if (!session) return of(new AccountResponse(false));
    //           user.partyId = session.partyId;
    //           return this.userRepository.saveUser(user)
    //               .pipe(switchMap(newUser => {
    //                   if (!newUser) return of(new AccountResponse(false));
    //                   if (!organization.name) {
    //                       organization.name = user.firstName + " " + user.lastName;
    //                   }
    //                   organization.partyId = session.partyId;
    //                   return this.organizationRepository.saveOrganization(organization)
    //                       .pipe(switchMap(newOrganization => {
    //                           if (!newOrganization) return of(new AccountResponse(false));
    //                           return this.credentialRepository.updateCredentialStatusById(session.credentialId, "Active")
    //                               .pipe(map( num => {
    //                                   // if (!num) return new AccountResponse(false);
    //                                   // return new AccountResponse(true, newUser, newOrganization);
    //                               }));
    //                       }));
    //               }));
    //       }));
    return null;
  }

  // private isValidAccount(user: User, organization: Organization) {
  //   // TODO: implement
  //   return false;
  // }

}
