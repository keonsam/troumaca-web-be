import { AuthenticatedCredential } from "../domain/model/authentication/authenticated.credential";
import { Observable } from "rxjs";
import { HeaderBaseOptions } from "../header.base.options";

export interface LoginDataProvider {

  authenticate(username: string, password: string, options?: HeaderBaseOptions): Observable<AuthenticatedCredential>;

}
