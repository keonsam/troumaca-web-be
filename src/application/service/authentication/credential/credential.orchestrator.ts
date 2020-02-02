import { createCredentialRepositoryFactory } from "../../../../infrastructure/authentication/credential.data.provider.factory";
import { CredentialDataProvider } from "../../../../port/credential.data.provider";
import { AuthenticatedCredential } from "../../../../domain/model/authentication/authenticated.credential";
import { Observable } from "rxjs";
import { Confirmation } from "../../../../domain/model/authentication/confirmation";
import { ChangePasswordRequest } from "../../../../domain/model/authentication/request/change.password.request";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RegisterRequest } from "../../../../domain/model/authentication/request/register.request";
import {CreateCredentialResponse} from "../../../../domain/model/authentication/dto/create.credential.response";

export class CredentialOrchestrator {

  private credentialRepository: CredentialDataProvider;

  constructor() {
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.isValidUsername(username, options);
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.isValidPassword(password, options);
  }

  addCredential(register: RegisterRequest, options?: HeaderBaseOptions): Observable<CreateCredentialResponse> {
    return this.credentialRepository.addCredential(register, options);
  }

  authenticate(credential: any, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
      return this.credentialRepository.authenticate(credential, options);
  }

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.credentialRepository.forgetPassword(username, options);
  }
  //
  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.changePassword(changePassword, options);
  }
}
