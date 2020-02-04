import { Observable } from "rxjs";
import { HeaderBaseOptions } from "../../../header.base.options";
import {Inject, Service} from "typedi";
import {RegisterDataProvider} from "../../../port/register.data.provider";
import {RegisterCustomerRequest} from "../../../domain/model/register/request/register.customer.request";
import {RegisterCustomerResponse} from "../../../domain/model/register/dto/register.customer.response";
import {RegisterDataProviderContext} from "../../../infrastructure/register/register.data.provider.context";

@Service("registerOrchestrator")
export class RegisterOrchestrator {

  private registerDataProvider: RegisterDataProvider;

  constructor(@Inject() registerDataProvider?: RegisterDataProvider) {
    if (registerDataProvider != null) {
      this.registerDataProvider = registerDataProvider;
    } else {
      this.registerDataProvider =  new RegisterDataProviderContext()
    }

  }

  registerCustomer(registerCustomerRequest: RegisterCustomerRequest, options?: HeaderBaseOptions)
  : Observable<RegisterCustomerResponse> {
    return this.registerDataProvider.registerCustomer(registerCustomerRequest, options);
  }

}
