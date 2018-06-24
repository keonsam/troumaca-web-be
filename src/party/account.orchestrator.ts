import Rx from "rxjs";
import {Observable} from "rxjs/Observable";
import {createUserRepository} from "./user/user.repository.factory";
import {createOrganizationRepository} from "./organization/organization.repository.factory";
import {createSessionRepositoryFactory} from "../session/session.repository.factory";
import {createCredentialRepositoryFactory} from "../authentication/credential/credential.repository.factory";
import {UserRepository} from "./user/user.repository";
import {OrganizationRepository} from "./organization/organization.repository";
import {User} from "./user/user";
import {Session} from "../session/session";
import {SessionRepository} from "../session/session.repository";
import {Organization} from "./organization/organization";
import {AccountResponse} from "./account.response";
import {CredentialRepository} from "../authentication/credential/credential.repository";

export class AccountOrchestrator {

  private userRepository:UserRepository;
  private organizationRepository:OrganizationRepository;
  private sessionRepository:SessionRepository;
  private credentialRepository:CredentialRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  saveAccount (accountType:string , user:User, organization:Organization, sessionId:string):Observable<AccountResponse> {
    // accountType not used in this current set up. you may find it of use in the future. I left it as is.
      return this.sessionRepository.getSessionById(sessionId)
          .switchMap((session: Session) => {
              if (!session.credentialId) return Observable.of(new AccountResponse(false));
              let credentialId: string = session["credentialId"];
              return this.credentialRepository.getCredentialByCredentialId(credentialId)
                  .switchMap(credential => {
                      if (!credential) return Observable.of(new AccountResponse(false));
                      user.username = credential.username;
                      return this.userRepository.saveUser(user)
                          .switchMap(newUser => {
                              if (!newUser) return Observable.of(new AccountResponse(false));
                              const partyId = newUser.partyId;
                              return this.credentialRepository.updateCredentialPartyId(credentialId, partyId)
                                  .switchMap(numReplaced => {
                                      if (!numReplaced) return Observable.of(new AccountResponse(false));
                                      return this.sessionRepository.updateSessionPartyId(sessionId, partyId)
                                          .switchMap(numReplaced => {
                                              if (!numReplaced) return Observable.of(new AccountResponse(false));
                                              if (!organization) return Observable.of(new AccountResponse(true, newUser));
                                              organization.partyId = partyId;
                                              return this.organizationRepository.saveOrganization(organization)
                                                  .map(newOrganization => {
                                                      if (!newOrganization) return new AccountResponse(false);
                                                      return new AccountResponse(true, newUser, newOrganization);
                                                  });
                                          });
                                  });
                          });
                  });
          });
  }

  // private isValidAccount(user: User, organization: Organization) {
  //   // TODO: implement
  //   return false;
  // }

}
