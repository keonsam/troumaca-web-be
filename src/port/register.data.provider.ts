import {Observable} from "rxjs";
import {RegisterCustomerResponse} from "../domain/model/register/dto/register.customer.response";
import {RegisterCustomerRequest} from "../domain/model/register/request/register.customer.request";
import {HeaderBaseOptions} from "../header.base.options";

export interface RegisterDataProvider {
  registerCustomer(registerCustomerRequest?: RegisterCustomerRequest, options?: HeaderBaseOptions): Observable<RegisterCustomerResponse>;
}
