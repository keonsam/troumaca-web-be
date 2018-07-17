// import validator from 'validator';
// import {CredentialStatus} from './credential.status';
import {ValidateResponse} from "./validate.response";
import {Credential} from "./credential";
import {createCredentialRepositoryFactory} from "./credential.repository.factory";
import {CredentialRepository} from "./credential.repository";
import {Observable} from "rxjs/Observable";
import {Session} from "../../session/session";
import {createSessionRepositoryFactory} from "../../session/session.repository.factory";
import {createCredentialConfirmationRepositoryFactory} from "./confirmation/confirmation.repository.factory";
import {SessionRepository} from "../../session/session.repository";
import {ConfirmationRepository} from "./confirmation/confirmation.repository";
import {CredentialConfirmation} from "./confirmation/credential.confirmation";
import {AuthenticateResponse} from "./authenticate.response";
// import {Result} from "../../result.success";
import "rxjs/add/operator/map";
import {AuthenticatedCredential} from "./authenticated.credential";

export class CredentialOrchestrator {

  private credentialRepository:CredentialRepository;
  private sessionRepository:SessionRepository;
  private confirmationRepository:ConfirmationRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    //this.credentialRepository = createCredentialRepositoryFactory(RepositoryKind.Rest);
    this.credentialRepository = createCredentialRepositoryFactory();
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
  }

  isValidUsername(credential:Credential):Observable<boolean> {
    return this.credentialRepository
    .isValidUsername(credential.username);
  };

  isValidPassword(credential:Credential):Observable<boolean> {
    return this.credentialRepository
    .isValidPassword(credential.password);
  };

  forgotPassword(username:string):Observable<ValidateResponse> {
    return this.credentialRepository
    .getCredentialByUsername(username)
    .map(credential => {
      if(!credential) {
        return new ValidateResponse(false);
      } else {
        return new ValidateResponse(true);
      }
    });
  };


  addCredential(credential:Credential, options?:any):Observable<CredentialConfirmation> {
    return this.credentialRepository.addCredential(credential, options);
  };

  authenticate(credential:Credential, options?:any):Observable<AuthenticateResponse> {
    // A person can access the application under the following conditions:
    // 1. He/she provides a valid set of credentials
    // 2. He/she has confirmed their username (email, or phone)
    // 3. He/she has completed the quick profile, person, account type, and possible organization name.

    return this.credentialRepository
    .authenticate(credential, options)
    .switchMap((result:AuthenticatedCredential) => {
      // unable to find the credential specified
      if (!result) return Observable.of(undefined);

      if (!result.authenticated) {
        return Observable.of(new AuthenticateResponse(
          result.authenticated,
          result.authenticateStatus,
          result.confirmationId,
          result.username,
          result.credentialId,
          null,
          result.partyId
        ));
      }

      // account exist after session so that the user can login in and create their profile
      let session:Session = new Session();
      session.partyId = result ? result.partyId : "";
      session.credentialId = result.credentialId;

      if (result.authenticateStatus) {
        session.data.set("authenticateStatus", result.authenticateStatus);
      }

      if (result.username) {
        session.data.set("username", result.username);
      }

      if (result.confirmationId) {
        session.data.set("confirmationId", result.confirmationId);
      }

      return this.sessionRepository.getOrCreate(session)
      .map(readSession => {
        return new AuthenticateResponse(
          result.authenticated,
          result.authenticateStatus,
          result.confirmationId,
          result.username,
          result.credentialId,
          readSession.sessionId,
          result.partyId
        );
      });
    });
  }

  isValidEditUsername (partyId:string, username: string) {
    return this.credentialRepository
      .isValidEditUsername(partyId, username)
      .map(valid => {
        return new ValidateResponse(valid);
      });
  }


  updateCredential (partyId:string, credential:Credential){
    return this.credentialRepository.updateCredential(partyId, credential);
  }

  deleteCredential (credentialId:string, options?:any):Observable<number> {
    return this.credentialRepository.deleteCredentialById(credentialId, options);
  }

}
