import {createCredentialConfirmationRepositoryFactory} from "../../../adapter/authentication/confirmation.repository.factory";
import {ConfirmationRepository} from "../../../repository/confirmation.repository";
import {Confirmation} from "../../../data/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../../../header.base.options";
import { ConfirmationInput } from "../../../graphql/authentication/dto/confirmation.input";

export class ConfirmationOrchestrator {

  private confirmationRepository: ConfirmationRepository;

  constructor() {
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.confirmationRepository.resendConfirmCode(confirmationId, credentialId, options);
  }

  confirmCode(confirmationInput: ConfirmationInput, options?: HeaderBaseOptions): Observable<string> {
    return this.confirmationRepository.confirmCode(confirmationInput, options);
  }

  // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation> {
  //   return this.confirmationRepository.resendConfirmCodeByUsername(username, options);
  // }

  // validateCode(credentialId: string, code: string, options?: any): Observable<boolean> {
  //   return this.confirmationRepository.validateCode(credentialId, code, options);
  // }

}
