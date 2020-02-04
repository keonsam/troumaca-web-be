import {createCredentialConfirmationRepositoryFactory} from "../../../../infrastructure/authentication/confirmation.data.provider.factory";
import {ConfirmationDataProvider} from "../../../../port/confirmation.data.provider";
import {Confirmation} from "../../../../domain/model/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { ConfirmationRequest } from "../../../../domain/model/authentication/request/confirmation.request";

export class ConfirmationOrchestrator {

  private confirmationRepository: ConfirmationDataProvider;

  constructor() {
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.confirmationRepository.resendConfirmCode(confirmationId, credentialId, options);
  }

  confirmCode(confirmationRequest: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string> {
    return this.confirmationRepository.confirmCode(confirmationRequest, options);
  }

  // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation> {
  //   return this.confirmationRepository.resendConfirmCodeByUsername(username, options);
  // }

  // validateCode(credentialId: string, code: string, options?: any): Observable<boolean> {
  //   return this.confirmationRepository.validateCode(credentialId, code, options);
  // }

}
