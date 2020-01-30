import {Confirmation} from "../data/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../header.base.options";
import { ConfirmationRequest } from "../graphql/authentication/dto/confirmation.request";

export interface ConfirmationRepository {

  confirmCode(confirmationInput: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string>;

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation>;
  //
  // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation>;
  //
  // validateCode(credentialId: string, code: string, options?: any): Observable<boolean>;

}
