import {ValidateResponse} from "./validate.response";
import {Credential} from "./credential";
import {createCredentialRepositoryFactory} from "./credential.repository.factory";
import {CredentialRepository} from "./credential.repository";
import {Observable} from "rxjs/Observable";
import {Session} from "../../session/session";
import {createSessionRepositoryFactory} from "../../session/session.repository.factory";
import {SessionRepository} from "../../session/session.repository";
import "rxjs/add/operator/map";
import {AuthenticatedCredential} from "./authenticated.credential";
import { Confirmation} from "./confirmation/confirmation";

export class CredentialOrchestrator {

  private credentialRepository:CredentialRepository;
  private sessionRepository:SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  isValidUsername(credential:Credential):Observable<boolean> {
    return this.credentialRepository.isValidUsername(credential.username);
  };

  isValidPassword(credential:Credential):Observable<boolean> {
    return this.credentialRepository
    .isValidPassword(credential.password);
  };

  addCredential(credential:Credential, options?:any):Observable<Confirmation> {
      return this.credentialRepository.addCredential(credential, options);
  };

  authenticate(credential:Credential, options?:any):Observable<AuthenticatedCredential> {
        // A person can access the application under the following conditions:
        // 1. He/she provides a valid set of credentials
        // 2. He/she has confirmed their username (email, or phone)
        // 3. He/she has completed the quick profile, person, account type, and possible organization name.

      return this.credentialRepository
          .authenticate(credential, options)
          .switchMap((authenticatedCredential: AuthenticatedCredential) => {
              console.log("here");

              if (!authenticatedCredential.authenticated) {
                  return Observable.of(authenticatedCredential);
              } else {
                  const session: Session = new Session();
                  session.partyId = authenticatedCredential.partyId;
                  session.credentialId = authenticatedCredential.credentialId;

                  if (authenticatedCredential.authenticateStatus) {
                      session.data.set("authenticateStatus", authenticatedCredential.authenticateStatus);
                  }

                  if (authenticatedCredential.username) {
                      session.data.set("username", authenticatedCredential.username);
                  }

                  if (authenticatedCredential.confirmationId) {
                      session.data.set("confirmationId", authenticatedCredential.confirmationId);
                  }
                  console.log(session);
                  return this.sessionRepository.addSession(session)
                      .map(session => {
                          authenticatedCredential.sessionId = session.sessionId;
                          return authenticatedCredential;
                      });
              }
          });
    }

  // forgotPassword(username:string):Observable<ValidateResponse> {
  //   return this.credentialRepository
  //   .getCredentialByUsername(username)
  //   .map(credential => {
  //     if(!credential) {
  //       return new ValidateResponse(false);
  //     } else {
  //       return new ValidateResponse(true);
  //     }
  //   });
  // };

  // isValidEditUsername (partyId:string, username: string) {
  //   return this.credentialRepository
  //     .isValidEditUsername(partyId, username)
  //     .map(valid => {
  //       return new ValidateResponse(valid);
  //     });
  // }
  //
  //
  // updateCredential (partyId:string, credential:Credential){
  //   return this.credentialRepository.updateCredential(partyId, credential);
  // }
  //
  // deleteCredential (credentialId:string, options?:any):Observable<number> {
  //   return this.credentialRepository.deleteCredentialById(credentialId, options);
  // }

}
