import {Observable} from "rxjs/Observable";
import {CredentialConfirmation} from "./credential.confirmation";

export interface ConfirmationRepository {

  confirmCode(confirmationId:string, credentialId:string, options?:any):Observable<boolean>;

  resendConfirmCode(confirmationId:string, credentialId:string, options?:any):Observable<boolean>;

  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<CredentialConfirmation>;

  getConfirmedConfirmation(credentialId:string):Observable<CredentialConfirmation>;

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string):Observable<CredentialConfirmation>;

  getCredentialConfirmationById(credentialConfirmationId:string):Observable<CredentialConfirmation>;

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<number>

  getCredentialConfirmationByCredentialId(credentialId:string):Observable<CredentialConfirmation>;

}
