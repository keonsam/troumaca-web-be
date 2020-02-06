import {HeaderBaseOptions} from "../../header.base.options";
import {Observable} from "rxjs";
import {AuthenticatedCredential} from "../../domain/model/authentication/authenticated.credential";
import {LoginDataProvider} from "../../port/login.data.provider";
import {createLoginDataProvider} from "./login.data.provider.factory";

export class LoginDataProviderContext implements LoginDataProvider {

  private loginDataProvider: LoginDataProvider;

  constructor(loginDataProvider?: LoginDataProvider) {
    if (loginDataProvider != null) {
      this.loginDataProvider = loginDataProvider;
    } else {
      this.loginDataProvider = createLoginDataProvider();
    }
  }

  authenticate(username: string, password: string, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
    return this.loginDataProvider.authenticate(username, password, options);
  }

}