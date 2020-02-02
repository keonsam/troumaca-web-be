import { Credential } from "../domain/model/authentication/credential";
import { AuthenticatedCredential } from "../domain/model/authentication/authenticated.credential";
import { CreateCredentialResponse } from "../domain/model/authentication/dto/create.credential.response";
import { Observable } from "rxjs";
import { Person } from "../domain/model/party/person";
import { Confirmation } from "../domain/model/authentication/confirmation";
import { ChangePasswordRequest } from "../domain/model/authentication/request/change.password.request";
import { ChangeResponse } from "../domain/model/authentication/dto/change.response";
import { HeaderBaseOptions } from "../header.base.options";
import { RegisterRequest } from "../domain/model/authentication/request/register.request";

export interface CredentialDataProvider {

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean>;

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean>;

  addCredential(register: RegisterRequest, options?: HeaderBaseOptions): Observable<CreateCredentialResponse>;

  authenticate(credential: Credential, options?: HeaderBaseOptions): Observable<AuthenticatedCredential>;

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation>;
  //
  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean>;

  // updateCredential(partyId: string, credential: Credential, options?: HeaderBaseOptions): Observable<number>;

  // USED BY OTHER REPOS

  // updateCredentialStatusByPartyId(partyId: string, status: string, options?: HeaderBaseOptions): Observable<number>;
  //
  // deleteCredentialByPartyId(partyId: string, options?: HeaderBaseOptions): Observable<number>;

}
