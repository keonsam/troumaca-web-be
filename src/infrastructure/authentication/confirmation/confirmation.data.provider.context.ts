import {ConfirmationDataProvider} from "../../../port/confirmation.data.provider";
import {ConfirmationRequest} from "../../../domain/model/authentication/request/confirmation.request";
import {HeaderBaseOptions} from "../../../header.base.options";
import {Observable} from "rxjs";
import {Confirmation} from "../../../domain/model/authentication/confirmation";
import {createConfirmationDataProvider} from "./confirmation.data.provider.factory";

export class ConfirmationDataProviderContext implements ConfirmationDataProvider {

  private confirmationDataProvider: ConfirmationDataProvider;

  constructor(confirmationDataProvider?: ConfirmationDataProvider) {
    if (confirmationDataProvider != null) {
      this.confirmationDataProvider = confirmationDataProvider;
    } else {
      this.confirmationDataProvider = createConfirmationDataProvider();
    }
  }

  confirmCode(confirmationRequest: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string> {
    return this.confirmationDataProvider.confirmCode(confirmationRequest, options);
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation> {
    return this.confirmationDataProvider.resendConfirmCode(confirmationId, credentialId, options);
  }

}