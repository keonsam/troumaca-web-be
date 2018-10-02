import { Credential } from "../../data/authentication/credential";
import { createCredentialRepositoryFactory } from "../../adapter/authentication/credential.repository.factory";
import { CredentialRepository } from "../../repository/credential.repository";
import { Session } from "../../data/session/session";
import { createSessionRepositoryFactory } from "../../adapter/session/session.repository.factory";
import { SessionRepository } from "../../repository/session.repository";
import { AuthenticatedCredential } from "../../data/authentication/authenticated.credential";
import { CreatedCredential } from "../../data/authentication/created.credential";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import {PersonRepository} from "../../repository/person.repository";
import {createPersonRepository} from "../../adapter/party/person.repository.factory";
import {Person} from "../../data/party/person";
import {CreateCredential} from "../../data/authentication/create.credential";

export class CredentialOrchestrator {

  private credentialRepository: CredentialRepository;
  private sessionRepository: SessionRepository;
  private personRepository: PersonRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.personRepository = createPersonRepository()
  }

  isValidUsername(username: string, partyId: string): Observable<boolean> {
    return this.credentialRepository.isValidUsername(username, partyId);
  }

  isValidPassword(credential: Credential): Observable<boolean> {
    return this.credentialRepository
    .isValidPassword(credential.password);
  }

  addCredential(createCredential: CreateCredential, options?: any): Observable<CreatedCredential> {
    return this.credentialRepository
    .addCredential(createCredential, options)
    .pipe(switchMap((createdCredential:CreatedCredential) => {
      let person = new Person();
      person.partyId = createdCredential.credential.partyId;
      person.firstName = createdCredential.firstName;
      person.lastName = createdCredential.lastName;
      return this.personRepository
        .addPerson(person, options)
        .pipe(map((value => {
          return createdCredential;
        })));
    }));
  }

  authenticate(credential: Credential, options?: any): Observable<AuthenticatedCredential> {
        // A person can access the application under the following conditions:
        // 1. He/she provides a valid set of credentials
        // 2. He/she has confirmed their username (email, or phone)
        // 3. He/she has completed the quick profile, person, account type, and possible organization name.

      return this.credentialRepository
          .authenticate(credential, options)
          .pipe(switchMap((authenticatedCredential: AuthenticatedCredential) =>  {
              if (!authenticatedCredential) {
                  return of(new AuthenticatedCredential());
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
                      .pipe(map(session => {
                          if (!session) {
                              return new AuthenticatedCredential();
                          }
                          authenticatedCredential.sessionId = session.sessionId;
                          return authenticatedCredential;
                      }));
              } else {
                  return of(authenticatedCredential);
              }
          }));
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
