import {ConfirmationDataProvider} from "../../../../port/confirmation.data.provider";
import {Confirmation} from "../../../../domain/model/authentication/confirmation";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { ConfirmationRequest } from "../../../../domain/model/authentication/request/confirmation.request";
import {ConfirmationDataProviderContext} from "../../../../infrastructure/authentication/confirmation/confirmation.data.provider.context";

export class ConfirmationOrchestrator {

  private confirmationDataProvider: ConfirmationDataProvider;

  constructor(confirmationDataProvider?: ConfirmationDataProvider) {
    if (confirmationDataProvider != null) {
      this.confirmationDataProvider = confirmationDataProvider;
    } else {
      this.confirmationDataProvider = new ConfirmationDataProviderContext()
    }
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.confirmationDataProvider.resendConfirmCode(confirmationId, credentialId, options);
  }

  confirmCode(confirmationRequest: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string> {
    return this.confirmationDataProvider.confirmCode(confirmationRequest, options);
  }

}
