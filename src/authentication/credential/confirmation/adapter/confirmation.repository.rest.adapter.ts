import {CredentialConfirmation} from "../credential.confirmation";
import {ConfirmationRepository} from "../confirmation.repository";
import {Observable} from "rxjs/Observable";

export class ConfirmationRepositoryRestAdapter implements ConfirmationRepository {
  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationByCredentialId(credentialId:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationById(credentialConfirmationId:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation): Observable<number> {
    return undefined;
  }

  getConfirmedConfirmation(credentialId:string):Observable<CredentialConfirmation> {
    return undefined;
  }
}
