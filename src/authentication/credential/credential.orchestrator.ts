import validator from 'validator';
import {CredentialStatus} from './credential.status';
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
import {Result} from "../../result.success";
import {RepositoryKind} from "../../repository.kind";

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

  isValidUsername(credential:Credential):Observable<ValidateResponse> {
    return this.credentialRepository
    .isValidUsername(credential.username)
    .map(valid => {
      return new ValidateResponse(valid);
    });
  };

  isValidPassword(credential:Credential):Observable<ValidateResponse> {
    return this.credentialRepository
    .isValidPassword(credential.password)
    .map(valid => {
      return new ValidateResponse(valid);
    });
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
      // .switchMap(credential => {
      //
      //   let credentialConfirmation:CredentialConfirmation = new CredentialConfirmation();
      //
      //   credentialConfirmation.credentialId = credential.credentialId;
      //   credentialConfirmation.createdOn = new Date();
      //   credentialConfirmation.modifiedOn = new Date();
      //
      //   return this.confirmationRepository
      //     .addCredentialConfirmation(credentialConfirmation);
      //
      // });
  };

  authenticate(credential:Credential):Observable<AuthenticateResponse> {
    // A person can access the application under the following conditions:
    // 1. He/she provides a valid set of credentials
    // 2. He/she has confirmed their username (email, or phone)
    // 3. He/she has completed the quick profile, person, account type, and possible organization name.
    return this.credentialRepository
      .authenticate(credential)
      .switchMap((result:Result<Credential>) => {

        // unable to find the credential specified
        if (!result) {
          return Observable.throw(this.createNotFoundError("Credential"));
        }

        let readCred = result.data;
        let authenticated:boolean = !result.fail;

        if (!authenticated) {
          return Observable.of(new AuthenticateResponse(authenticated));
        }

        let readCredStatus = readCred.credentialStatus;

        let credentialActive:boolean = (readCredStatus === CredentialStatus.ACTIVE); // wrong logic before 1 === 1 = true while  1 !== 1 = false

        // do not continue if the status is not active
        if (!credentialActive) {
          // add credentialConfirmationId to redirect
          return this.confirmationRepository.getCredentialConfirmationByCredentialId(readCred.credentialId)
            .map(credentialConfirmation => {
              return new AuthenticateResponse(authenticated, credentialActive, credentialConfirmation.credentialConfirmationId);
            });
        }

        // account exist after session so that the user can login in and create their profile
        let accountExists = this.isNull(readCred.partyId);

        let session:Session = new Session();

        session.partyId = readCred.partyId ? readCred.partyId: "";
        session.credentialId = readCred.credentialId;
        session.data.set("credentialStatus", readCred.credentialStatus);

        if (!validator.isEmail(readCred.username)) {
          session.data.set("phone", readCred.username);
        }

        return this.sessionRepository.addSession(session)
        .map(readSession => {
          return new AuthenticateResponse(authenticated, credentialActive, "",accountExists, readCred, readSession);
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

  isNull(obj:any):boolean {
    if (obj) {
      return true;
    } else {
      return false;
    }
  }

  createNotFoundError(name:string):any {
    return new Error(JSON.stringify({
      "statusCode":404,
      "message": name + " not found."
    }));
  }

}
