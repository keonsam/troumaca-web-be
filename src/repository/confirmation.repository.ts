import {Confirmation} from "../data/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../header.base.options";
import { ConfirmationInput } from "../graphql/authentication/dto/confirmation.input";

export interface ConfirmationRepository {

  confirmCode(confirmationInput: ConfirmationInput, options?: HeaderBaseOptions): Observable<Confirmation>;

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation>;
  //
  // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation>;
  //
  // validateCode(credentialId: string, code: string, options?: any): Observable<boolean>;

}
