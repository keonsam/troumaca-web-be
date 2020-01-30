import {Credential} from "../data/authentication/credential";
import {AuthenticatedCredential} from "../data/authentication/authenticated.credential";
import {CreatedCredential} from "../data/authentication/created.credential";
import {Observable} from "rxjs";
import {Person} from "../data/party/person";
import { Confirmation } from "../data/authentication/confirmation";
import {ChangePasswordRequest} from "../graphql/authentication/dto/change.password.request";
import { ChangeResponse } from "../data/authentication/change.response";
import { HeaderBaseOptions } from "../header.base.options";
import { RegisterRequest } from "../graphql/authentication/dto/register.request";
import {RegisterResponse} from "../data/authentication/register.response";

export interface CredentialRepository {

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean>;

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean>;

  addCredential(register: RegisterRequest, options?: HeaderBaseOptions): Observable<Confirmation>;

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
