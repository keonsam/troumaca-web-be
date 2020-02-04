import { createCredentialRepositoryFactory } from "../../../../infrastructure/authentication/credential.data.provider.factory";
import { CredentialDataProvider } from "../../../../port/credential.data.provider";
import { AuthenticatedCredential } from "../../../../domain/model/authentication/authenticated.credential";
import { Observable } from "rxjs";
import { Confirmation } from "../../../../domain/model/authentication/confirmation";
import { ChangePasswordRequest } from "../../../../domain/model/authentication/request/change.password.request";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RegisterRequest } from "../../../../domain/model/authentication/request/register.request";
import {Inject, Service} from "typedi";
import {CreatedCredential} from "../../../../domain/model/authentication/dto/created.credential";

export class CredentialOrchestrator {

  private credentialDataProvider: CredentialDataProvider;

  constructor() {
    this.credentialDataProvider = createCredentialRepositoryFactory();
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.isValidUsername(username, options);
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.isValidPassword(password, options);
  }

  addCredential(register: RegisterRequest, options?: HeaderBaseOptions): Observable<CreatedCredential> {
    return this.credentialDataProvider.addCredential(register, options);
  }

  authenticate(credential: any, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
      return this.credentialDataProvider.authenticate(credential, options);
  }

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.credentialDataProvider.forgetPassword(username, options);
  }
  //
  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.changePassword(changePassword, options);
  }
}
