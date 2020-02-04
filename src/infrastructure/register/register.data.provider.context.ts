import {RegisterDataProvider} from "../../port/register.data.provider";
import {RegisterCustomerRequest} from "../../domain/model/register/request/register.customer.request";
import {HeaderBaseOptions} from "../../header.base.options";
import {Observable} from "rxjs";
import {RegisterCustomerResponse} from "../../domain/model/register/dto/register.customer.response";
import {Service} from "typedi";
import {createRegistrarDataProvider} from "./register.data.provider.factory";

@Service()
export class RegisterDataProviderContext implements RegisterDataProvider {

  private registerDataProvider:RegisterDataProvider;

  constructor(registerDataProvider?:RegisterDataProvider) {
    if (registerDataProvider != null) {
      this.registerDataProvider = registerDataProvider;
    } else {
      this.registerDataProvider = createRegistrarDataProvider()
    }
  }

  registerCustomer(registerCustomerRequest?: RegisterCustomerRequest, options?: HeaderBaseOptions)
  : Observable<RegisterCustomerResponse> {
    return this.registerDataProvider.registerCustomer(registerCustomerRequest, options);
  }

}