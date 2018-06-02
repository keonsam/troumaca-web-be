import {Observable} from "rxjs/Observable";
import {CredentialConfirmation} from "./credential.confirmation";

export interface ConfirmationRepository {

  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<CredentialConfirmation>;

  getConfirmedConfirmation(credentialId:string):Observable<CredentialConfirmation>;

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string):Observable<CredentialConfirmation>;

  getCredentialConfirmationById(credentialConfirmationId:string):Observable<CredentialConfirmation>;

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<number>

  getCredentialConfirmationByCredentialId(credentialId:string):Observable<CredentialConfirmation>;

}
