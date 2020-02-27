import {CredentialDataProvider} from "../../../port/credential.data.provider";
import {HeaderBaseOptions} from "../../../header.base.options";
import {Observable} from "rxjs";
import {ChangePasswordRequest} from "../../../domain/model/authentication/request/change.password.request";
import {Confirmation} from "../../../domain/model/authentication/confirmation";
import {createCredentialDataProvider} from "./credential.data.provider.factory";

export class CredentialDataProviderContext implements CredentialDataProvider {

  private credentialDataProvider: CredentialDataProvider;

  constructor(credentialDataProvider?: CredentialDataProvider) {
    if (credentialDataProvider != undefined) {
      this.credentialDataProvider = credentialDataProvider;
    } else {
      this.credentialDataProvider = createCredentialDataProvider();
    }
  }

  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.changePassword(changePassword, options);
  }

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.credentialDataProvider.forgetPassword(username, options);
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.isValidPassword(password, options);
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialDataProvider.isValidUsername(username, options);
  }

}
