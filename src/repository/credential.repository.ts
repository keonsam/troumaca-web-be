import {Credential} from "../data/authentication/credential";
import {AuthenticatedCredential} from "../data/authentication/authenticated.credential";
import {CreatedCredential} from "../data/authentication/created.credential";
import {Observable} from "rxjs";
import {Person} from "../data/party/person";
import { Confirmation } from "../data/authentication/confirmation";
import {ChangePassword} from "../data/authentication/change.password";
import { ChangeResponse } from "../data/authentication/change.response";

export interface CredentialRepository {

  isValidUsername(username: string, partyId: string, options?: any): Observable<boolean>;

  isValidPassword(password: string, options?: any): Observable<boolean>;

  addCredential(person: Person, credential: Credential, options?: any): Observable<CreatedCredential>;

  authenticate(credential: Credential, options: any): Observable<AuthenticatedCredential>;

  forgetPassword(credential: Credential, options: any): Observable<Confirmation>;

  changePassword(changePassword: ChangePassword, options: any): Observable<ChangeResponse>;

  updateCredential(partyId: string, credential: Credential, options?: any): Observable<number>;

  // USED BY OTHER REPOS

  updateCredentialStatusByPartyId(partyId: string, status: string, options?: any): Observable<number>;

  deleteCredentialByPartyId(partyId: string, options?: any): Observable<number>;

}
