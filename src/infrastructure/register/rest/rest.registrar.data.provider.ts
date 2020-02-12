import {Observable, Observer} from "rxjs";
import {RegisterDataProvider} from "../../../port/register.data.provider";
import {RegisterCustomerRequest} from "../../../domain/model/register/request/register.customer.request";
import {HeaderBaseOptions} from "../../../header.base.options";
import {RegisterCustomerResponse} from "../../../domain/model/register/dto/register.customer.response";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../request.helpers";
import request from "request";


export class RestRegistrarDataProvider implements RegisterDataProvider {

  constructor(private registrarUrl: string) {
  }

  registerCustomer(registerCustomerRequest?: RegisterCustomerRequest, options?: HeaderBaseOptions)
  : Observable<RegisterCustomerResponse> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/registrar/v3/register`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, registerCustomerRequest);

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            // Todo: Need fixing
            subscriber.next(body);
          }
        }
        subscriber.complete();
      });
    });
  }

}
