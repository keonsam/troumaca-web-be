import {Confirmation} from "../data/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../header.base.options";

export interface ConfirmationRepository {

  confirmCode(confirmationId: string, credentialId: string, code: string, options?: HeaderBaseOptions): Observable<Confirmation>;

  // resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation>;
  //
  // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation>;
  //
  // validateCode(credentialId: string, code: string, options?: any): Observable<boolean>;

}
