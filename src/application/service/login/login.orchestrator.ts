import { Observable } from "rxjs";
import { HeaderBaseOptions } from "../../../header.base.options";
import {Inject, Service} from "typedi";
import {LoginDataProvider} from "../../../port/login.data.provider";
import {LoginDataProviderContext} from "../../../infrastructure/login/login.data.provider.context";
import {AuthenticatedCredential} from "../../../domain/model/authentication/authenticated.credential";

@Service("loginOrchestrator")
export class LoginOrchestrator {

  private loginDataProvider: LoginDataProvider;

  constructor(@Inject() loginDataProvider?: LoginDataProvider) {
    if (loginDataProvider != null) {
      this.loginDataProvider = loginDataProvider;
    } else {
      this.loginDataProvider =  new LoginDataProviderContext()
    }
  }

  authenticate(username: string, password: string, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
    return this.loginDataProvider.authenticate(username, password, options);
  }

}
