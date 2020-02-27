import { CredentialDataProvider } from "../../../../port/credential.data.provider";
import { Observable } from "rxjs";
import { Confirmation } from "../../../../domain/model/authentication/confirmation";
import { ChangePasswordRequest } from "../../../../domain/model/authentication/request/change.password.request";
import { HeaderBaseOptions } from "../../../../header.base.options";
import {CredentialDataProviderContext} from "../../../../infrastructure/authentication/credential/credential.data.provider.context";

export class CredentialOrchestrator {

  private credentialDataProvider: CredentialDataProvider;

  constructor(credentialDataProvider?: CredentialDataProvider) {
    if (credentialDataProvider != undefined) {
      this.credentialDataProvider = credentialDataProvider;
    } else {
      this.credentialDataProvider = new CredentialDataProviderContext();
    }
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.isValidUsername(username, options);
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.isValidPassword(password, options);
  }

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.credentialDataProvider.forgetPassword(username, options);
  }

  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.changePassword(changePassword, options);
  }
}
