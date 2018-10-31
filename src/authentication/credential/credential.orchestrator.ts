import {Credential} from "../../data/authentication/credential";
import {createCredentialRepositoryFactory} from "../../adapter/authentication/credential.repository.factory";
import {CredentialRepository} from "../../repository/credential.repository";
import {Session} from "../../data/session/session";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";
import {SessionRepository} from "../../repository/session.repository";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Observable, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {UserRepository} from "../../repository/user.repository";
import {createUserRepository} from "../../adapter/party/user.repository.factory";
import {Confirmation} from "../../data/authentication/confirmation";
import {PersonRepository} from "../../repository/person.repository";
import {createPersonRepository} from "../../adapter/party/person.repository.factory";
import {Person} from "../../data/party/person";
import {CreateCredential} from "../../repository/create.credential";

export class CredentialOrchestrator {

  private credentialRepository: CredentialRepository;
  private sessionRepository: SessionRepository;
  private userRepository: UserRepository;
  private personRepository: PersonRepository;


  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.userRepository = createUserRepository();
    this.personRepository = createPersonRepository();
  }

  isValidUsername(username: string, partyId: string): Observable<boolean> {
    return this.credentialRepository.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<boolean> {
    return this.credentialRepository
      .isValidPassword(password);
  }

  addCredential(credential: Credential, person: Person, options?: any): Observable<Confirmation> {
    return this.credentialRepository.addCredential(person, credential, options)
    .pipe(switchMap(createdCredential => {
      if (!createdCredential) {
        return throwError(credential);
      } else {
        person.partyId = credential.partyId;
        return this.personRepository.addPerson(person)
        .pipe(map(person => {
          if (!person) {
            throw new Error("user was not created.");
          } else {
            return createdCredential.confirmation;
          }
        }));
      }
    }));
  }

  authenticate(credential: Credential, options?: any): Observable<AuthenticatedCredential> {
    // A person can access the application under the following conditions:
    // 1. He/she provides a valid set of credentials
    // 2. He/she has confirmed their username (email, or phone)
    // 3. He/she has completed the quick profile, person, account type, and possible organization name.

    return this.credentialRepository
      .authenticate(credential, options)
      .pipe(switchMap(authenticatedCredential => {
        if (!authenticatedCredential) {
          return throwError(authenticatedCredential);
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
                throw new Error("Session was not created.");
              } else {
                authenticatedCredential.sessionId = session.sessionId;
                return authenticatedCredential;
              }
            }));
        } else {
          return of(authenticatedCredential);
        }
      }));
  }

  updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
    return this.credentialRepository.updateCredentialStatusById(credentialId, status);
  }

}
