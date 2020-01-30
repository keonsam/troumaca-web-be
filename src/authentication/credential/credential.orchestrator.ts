import {createCredentialRepositoryFactory} from "../../adapter/authentication/credential.repository.factory";
import {CredentialRepository} from "../../repository/credential.repository";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Observable} from "rxjs";
import {Confirmation} from "../../data/authentication/confirmation";
import {ChangePasswordRequest} from "../../graphql/authentication/dto/change.password.request";
import { HeaderBaseOptions } from "../../header.base.options";
import { RegisterRequest } from "../../graphql/authentication/dto/register.request";

export class CredentialOrchestrator {

  private credentialRepository: CredentialRepository;


  constructor() {
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.isValidUsername(username, options);
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.isValidPassword(password, options);
  }

  addCredential(register: RegisterRequest, options?: HeaderBaseOptions): Observable<Confirmation> {
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
