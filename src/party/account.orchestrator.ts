import Rx from "rxjs";
import { Observable } from "rxjs/Observable";
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

export class AccountOrchestrator {

  private userRepository: UserRepository;
  private organizationRepository: OrganizationRepository;
  private sessionRepository: SessionRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
  }

  saveAccount (user: User, organization: Organization, sessionId: string): Observable<AccountResponse> {
    // accountType not used in this current set up. you may find it of use in the future. I left it as is.
      return this.sessionRepository.getSessionById(sessionId)
          .switchMap((session: Session) => {
              if (!session) return Observable.of(new AccountResponse(false));
              user.partyId = session.partyId;
              return this.userRepository.saveUser(user)
                  .switchMap(newUser => {
                      if (!newUser) return Observable.of(new AccountResponse(false));
                      if (!organization.name) {
                          organization.name = user.firstName + " " + user.lastName;
                      }
                      organization.partyId = session.partyId;
                      return this.organizationRepository.saveOrganization(organization)
                          .map(newOrganization => {
                              if (!newOrganization) return new AccountResponse(false);
                              return new AccountResponse(true, newUser, newOrganization);
                          });
                  });
          });
  }

  // private isValidAccount(user: User, organization: Organization) {
  //   // TODO: implement
  //   return false;
  // }

}
