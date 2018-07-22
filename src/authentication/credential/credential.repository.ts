import {Observable} from "rxjs/Observable";
import {Credential} from './credential';
import {Result} from "../../result.success";
import {CredentialConfirmation} from "./confirmation/credential.confirmation";
import {ValidatedUsername} from "./confirmation/validated.username";
import {AuthenticatedCredential} from "./authenticated.credential";
import {Confirmation} from "./confirmation/confirmation";

export interface CredentialRepository {

  isValidUsername(username:string):Observable<boolean>;

  isValidEditUsername(partyId:string, username:string):Observable<boolean>;

  isValidPassword(password:string):Observable<boolean>;

  getCredentialByUsername(username:string):Observable<Credential>;

  getCredentialByCredentialId(credentialId:string):Observable<Credential>;

  getSanitizeCredentialByUsername(credentialId:string):Observable<Credential>;

  //authenticate(credential:Credential, options:any):Observable<Result<AuthenticatedCredential>>;
  authenticate(credential:Credential, options:any):Observable<AuthenticatedCredential>;

  checkUsernameValid(partyId:string, username:string):Observable<Credential>;

  addCredential(credential:Credential, options?:any):Observable<Confirmation>;

  addUserCredential(credential:Credential):Observable<Credential>;

  authenticateCredential(credential:Credential):Observable<Credential>;

  updateCredential(partyId: string, credential: Credential): Observable<number>;

  updateCredentialStatusById(credentialId:string, status:string):Observable<number>;

  updateCredentialPartyId(credentialId: string, partyId: string): Observable<number>;

  deleteCredentialByPartyId(partyId:string): Observable<number>;

  deleteCredentialById(credentialId:string, options?:any): Observable<number>;

}
