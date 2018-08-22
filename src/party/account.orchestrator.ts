import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { createUserRepository } from "./user/user.repository.factory";
import { createOrganizationRepository } from "./organization/organization.repository.factory";
import { createSessionRepositoryFactory } from "../session/session.repository.factory";
import { UserRepository } from "./user/user.repository";
import { OrganizationRepository } from "./organization/organization.repository";
import { User } from "./user/user";
import { Session } from "../session/session";
import { SessionRepository } from "../session/session.repository";
import { Organization } from "./organization/organization";
import { AccountResponse } from "./account.response";
import { CredentialRepository } from "../authentication/credential/credential.repository";
import { createCredentialRepositoryFactory } from "../authentication/credential/credential.repository.factory";

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
      return this.sessionRepository.getSessionById(sessionId)
          .pipe(switchMap((session: Session) => {
              if (!session) return of(new AccountResponse(false));
              user.partyId = session.partyId;
              return this.userRepository.saveUser(user)
                  .pipe(switchMap(newUser => {
                      if (!newUser) return of(new AccountResponse(false));
                      if (!organization.name) {
                          organization.name = user.firstName + " " + user.lastName;
                      }
                      organization.partyId = session.partyId;
                      return this.organizationRepository.saveOrganization(organization)
                          .pipe(switchMap(newOrganization => {
                              if (!newOrganization) return of(new AccountResponse(false));
                              return this.credentialRepository.updateCredentialStatusById(session.credentialId, "Active")
                                  .pipe(map( num => {
                                      if (!num) return new AccountResponse(false);
                                      return new AccountResponse(true, newUser, newOrganization);
                                  }));
                          }));
                  }));
          }));
  }

  // private isValidAccount(user: User, organization: Organization) {
  //   // TODO: implement
  //   return false;
  // }

}
