import {Confirmation} from "../data/authentication/confirmation";
import {Observable} from "rxjs";

export interface ConfirmationRepository {

  confirmCode(confirmationId: string, credentialId: string, confirmation: Confirmation, options?: any): Observable<Confirmation>;

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation>;

  resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation>;

  validateCode(credentialId: string, code: string, options?: any): Observable<boolean>;

}