import {ConfirmationDataProvider} from "../../../port/confirmation.data.provider";
import {properties} from "../../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../request.helpers";
import { Observable, Observer} from "rxjs";
import request from "request";
import {Confirmation} from "../../../domain/model/authentication/confirmation";
import { HeaderBaseOptions } from "../../../header.base.options";
import { ConfirmationRequest } from "../../../domain/model/authentication/request/confirmation.request";

export class RestConfirmationDataProvider implements ConfirmationDataProvider {

  localhost = "http://localhost:8888";
  remote = true;

  confirmCode(confirmationInput: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string> {
    const uri: string = this.remote ? properties.get("confirmation.host.port") as string : this.localhost;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
        credentialId: confirmationInput.credentialId,
        confirmationId: confirmationInput.confirmationId,
        code: confirmationInput.code
    };

    const uriAndPath: string = `${uri}/authentication/confirmations/${confirmationInput.confirmationId}/credentials/${confirmationInput.credentialId}`;

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
    const uri: string = this.remote ? properties.get("confirmation.host.port") as string : this.localhost;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = { };

    const uriAndPath: string = `${uri}/${confirmationId}/credentials/${credentialId}/resend`;

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

  // resendConfirmCodeByUsername(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
  //   const uri: string = this.remote ? properties.get("confirmation.host.port") as string : this.localhost;
  //
  //   const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});
  //
  //   const json = {username: username};
  //
  //   const uriAndPath: string = `${uri}/authentication/confirmations/credentials/resend-by-username`;
  //
  //   const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);
  //
  //   return Observable.create(function (observer: Observer<Confirmation>) {
  //     request(requestOptions, function (error: any, response: any, body: any) {
  //       try {
  //         if (response && response.statusCode != 200) {
  //           observer.error(body);
  //         } else {
  //           observer.next(body["confirmation"]);
  //         }
  //       } catch (e) {
  //         observer.error(new Error(e.message));
  //       }
  //       observer.complete();
  //     });
  //   });
  // }
  //
  // validateCode(credentialId: string, code: string, options?: HeaderBaseOptions): Observable<boolean> {
  //   const uri: string = this.remote ? properties.get("confirmation.host.port") as string : this.localhost;
  //
  //   const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});
  //
  //   const validateConfirmCodeJson = classToPlain(new ValidateConfirmCode(credentialId, code));
  //
  //   const uriAndPath: string = `${uri}/authentication/confirmations/validate-code`;
  //
  //   const requestOptions: any = postJsonOptions(uriAndPath, headerMap, validateConfirmCodeJson);
  //
  //   return Observable.create(function (observer: Observer<Confirmation>) {
  //     request(requestOptions, function (error: any, response: any, body: any) {
  //       console.log(body);
  //       try {
  //         if (response && response.statusCode != 200) {
  //           observer.error(body);
  //         } else {
  //           observer.next(body);
  //         }
  //       } catch (e) {
  //         observer.error(new Error(e.message));
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

}
