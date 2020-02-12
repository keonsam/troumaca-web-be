import { Credential } from "../domain/model/authentication/credential";
import { AuthenticatedCredential } from "../domain/model/authentication/authenticated.credential";
import { Observable } from "rxjs";
import { Person } from "../domain/model/party/person/person";
import { Confirmation } from "../domain/model/authentication/confirmation";
import { ChangePasswordRequest } from "../domain/model/authentication/request/change.password.request";
import { ChangeResponse } from "../domain/model/authentication/dto/change.response";
import { HeaderBaseOptions } from "../header.base.options";
import { RegisterRequest } from "../domain/model/authentication/request/register.request";
import {CreatedCredential} from "../domain/model/authentication/dto/created.credential";

export interface CredentialDataProvider {

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean>;

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean>;

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation>;

  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean>;

}
