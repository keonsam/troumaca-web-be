import {ConfirmationDataProvider} from "../../../../port/confirmation.data.provider";
import {properties} from "../../../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../../request.helpers";
import { Observable, Observer} from "rxjs";
import request from "request";
import {Confirmation} from "../../../../domain/model/authentication/confirmation";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { ConfirmationRequest } from "../../../../domain/model/authentication/request/confirmation.request";

export class RestConfirmationDataProvider implements ConfirmationDataProvider {

  constructor(private registrarUrl: string) {
  }

  confirmCode(confirmationInput: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
        credentialId: confirmationInput.credentialId,
        confirmationId: confirmationInput.confirmationId,
        code: confirmationInput.code
    };

    const uriAndPath: string = `${this.registrarUrl}/authentication/confirmations/${confirmationInput.confirmationId}/credentials/${confirmationInput.credentialId}`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Confirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["credential"]["status"]);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = { };

    const uriAndPath: string = `${this.registrarUrl}/${confirmationId}/credentials/${credentialId}/resend`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Confirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["confirmationEvent"]["confirmation"]);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

}
