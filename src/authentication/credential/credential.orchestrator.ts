import { Credential } from "../../data/authentication/credential";
import { createCredentialRepositoryFactory } from "../../adapter/authentication/credential.repository.factory";
import { CredentialRepository } from "../../repository/credential.repository";
import { Observable } from "rxjs/Observable";
import { Session } from "../../data/session/session";
import { createSessionRepositoryFactory } from "../../adapter/session/session.repository.factory";
import { SessionRepository } from "../../repository/session.repository";
import "rxjs/add/operator/map";
import { AuthenticatedCredential } from "../../data/authentication/authenticated.credential";
import { CreatedCredential } from "../../data/authentication/created.credential";

export class CredentialOrchestrator {

  private credentialRepository: CredentialRepository;
  private sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  isValidUsername(username: string, partyId: string): Observable<boolean> {
    return this.credentialRepository.isValidUsername(username, partyId);
  }

  isValidPassword(credential: Credential): Observable<boolean> {
    return this.credentialRepository
    .isValidPassword(credential.password);
  }

  addCredential(credential: Credential, options?: any): Observable<CreatedCredential> {
      return this.credentialRepository.addCredential(credential, options);
  }

  authenticate(credential: Credential, options?: any): Observable<AuthenticatedCredential> {
        // A person can access the application under the following conditions:
        // 1. He/she provides a valid set of credentials
        // 2. He/she has confirmed their username (email, or phone)
        // 3. He/she has completed the quick profile, person, account type, and possible organization name.

      return this.credentialRepository
          .authenticate(credential, options)
          .switchMap((authenticatedCredential: AuthenticatedCredential) =>  {
              if (!authenticatedCredential) {
                  return Observable.of(new AuthenticatedCredential());
              } else if (authenticatedCredential.authenticateStatus === "AccountConfirmed" || authenticatedCredential.authenticateStatus === "AccountActive") {
                  const session: Session = new Session();
                  session.partyId = authenticatedCredential.partyId;
                  session.credentialId = authenticatedCredential.credentialId;
                  session.username = authenticatedCredential.username;

                  if (authenticatedCredential.authenticateStatus) {
                      session.data.set("authenticateStatus", authenticatedCredential.authenticateStatus);
                  }

                  if (authenticatedCredential.username) {
                      session.data.set("username", authenticatedCredential.username);
                  }

                  if (authenticatedCredential.confirmationId) {
                      session.data.set("confirmationId", authenticatedCredential.confirmationId);
                  }
                  return this.sessionRepository.addSession(session, options)
                      .map(session => {
                          console.log(session);
                          if (!session) {
                              return new AuthenticatedCredential();
                          }
                          authenticatedCredential.sessionId = session.sessionId;
                          return authenticatedCredential;
                      });
              } else {
                  return Observable.of(authenticatedCredential);
              }
          });
    }

    updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
      return this.credentialRepository.updateCredentialStatusById(credentialId, status);
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
