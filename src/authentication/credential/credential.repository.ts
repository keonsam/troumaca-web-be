import { Observable } from "rxjs";
import { Credential } from "./credential";
import { AuthenticatedCredential } from "./authenticated.credential";
import { CreatedCredential } from "./created.credential";

export interface CredentialRepository {

  isValidUsername(username: string, partyId: string): Observable<boolean>;

  isValidPassword(password: string): Observable<boolean>;

  addCredential(credential: Credential, options?: any): Observable<CreatedCredential>;

  authenticate(credential: Credential, options: any): Observable<AuthenticatedCredential>;

  updateCredentialStatusById(credentialId: string, status: string): Observable<number>;

  // USED BY OTHER REPOS
  updateUserCredential(partyId: string, credential: Credential): Observable<number>;

  // isValidEditUsername(partyId:string, username:string):Observable<boolean>;

  // getCredentialByUsername(username:string):Observable<Credential>;
  //
  // getCredentialByCredentialId(credentialId:string):Observable<Credential>;
  //
  // getSanitizeCredentialByUsername(credentialId:string):Observable<Credential>;
  //
  // //authenticate(credential:Credential, options:any):Observable<Result<AuthenticatedCredential>>;
  //
  // checkUsernameValid(partyId:string, username:string):Observable<Credential>;
  //
  // addUserCredential(credential:Credential):Observable<Credential>;
  //
  // authenticateCredential(credential:Credential):Observable<Credential>;
  //
  // updateCredential(partyId: string, credential: Credential): Observable<number>;
  //
  //
  // updateCredentialPartyId(credentialId: string, partyId: string): Observable<number>;
  //
  // deleteCredentialByPartyId(partyId:string): Observable<number>;
  //
  // deleteCredentialById(credentialId:string, options?:any): Observable<number>;

}
