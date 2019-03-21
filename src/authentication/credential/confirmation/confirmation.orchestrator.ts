import {createCredentialConfirmationRepositoryFactory} from "../../../adapter/authentication/confirmation.repository.factory";
import {ConfirmationRepository} from "../../../repository/confirmation.repository";
import {Confirmation} from "../../../data/authentication/confirmation";
import {Observable} from "rxjs";

export class ConfirmationOrchestrator {

  private confirmationRepository: ConfirmationRepository;

  constructor() {
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation> {
    return this.confirmationRepository.resendConfirmCode(confirmationId, credentialId, options);
  }

  confirmCode(confirmationId: string, credentialId: string, code: string, options?: any): Observable<Confirmation> {
    return this.confirmationRepository.confirmCode(confirmationId, credentialId, code, options);
  }

  resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation> {
    return this.confirmationRepository.resendConfirmCodeByUsername(username, options);
  }

  validateCode(credentialId: string, code: string, options?: any): Observable<boolean> {
    return this.confirmationRepository.validateCode(credentialId, code, options);
  }

}
