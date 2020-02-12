import {Confirmation} from "../domain/model/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../header.base.options";
import { ConfirmationRequest } from "../domain/model/authentication/request/confirmation.request";

export interface ConfirmationDataProvider {

  confirmCode(confirmationRequest: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string>;

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation>;

  // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation>;
  // validateCode(credentialId: string, code: string, options?: any): Observable<boolean>;

}
