import { Observable } from "rxjs/Observable";
import { Confirmation } from "../data/confirmation";

export interface ConfirmationRepository {

  confirmCode(confirmationId: string, credentialId: string, confirmation: Confirmation, options?: any): Observable<Confirmation>;

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation>;

  // addCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<CredentialConfirmation>;
  //
  // getConfirmedConfirmation(credentialId:string):Observable<CredentialConfirmation>;
  //
  // getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string):Observable<CredentialConfirmation>;
  //
  // getCredentialConfirmationById(credentialConfirmationId:string):Observable<CredentialConfirmation>;
  //
  // updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<number>
  //
  // getCredentialConfirmationByCredentialId(credentialId:string):Observable<CredentialConfirmation>;

}
