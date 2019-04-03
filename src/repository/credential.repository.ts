import {Credential} from "../data/authentication/credential";
import {AuthenticatedCredential} from "../data/authentication/authenticated.credential";
import {CreatedCredential} from "../data/authentication/created.credential";
import {Observable} from "rxjs";
import {Person} from "../data/party/person";
import { Confirmation } from "../data/authentication/confirmation";
import {ChangePassword} from "../data/authentication/change.password";
import { ChangeResponse } from "../data/authentication/change.response";
import { HeaderBaseOptions } from "../header.base.options";

export interface CredentialRepository {

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean>;

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean>;

  addCredential(person: Person, credential: Credential, options?: HeaderBaseOptions): Observable<CreatedCredential>;

  authenticate(credential: Credential, options?: HeaderBaseOptions): Observable<AuthenticatedCredential>;

  // forgetPassword(credential: Credential, options?: HeaderBaseOptions): Observable<Confirmation>;
  //
  // changePassword(changePassword: ChangePassword, options?: HeaderBaseOptions): Observable<ChangeResponse>;

  // updateCredential(partyId: string, credential: Credential, options?: HeaderBaseOptions): Observable<number>;

  // USED BY OTHER REPOS

  // updateCredentialStatusByPartyId(partyId: string, status: string, options?: HeaderBaseOptions): Observable<number>;
  //
  // deleteCredentialByPartyId(partyId: string, options?: HeaderBaseOptions): Observable<number>;

}
