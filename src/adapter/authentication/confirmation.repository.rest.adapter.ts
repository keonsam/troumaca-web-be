import {ConfirmationRepository} from "../../repository/confirmation.repository";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import { Observable, Observer} from "rxjs";
import request from "request";
import {Confirmation} from "../../data/authentication/confirmation";
import {classToPlain} from "class-transformer";
import {ValidateConfirmCode} from "../../repository/validate.confirm.code";
import { HeaderBaseOptions } from "../../header.base.options";

export class ConfirmationRepositoryRestAdapter implements ConfirmationRepository {

  confirmCode(confirmationId: string, credentialId: string, code: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {code};

    const uriAndPath: string = `${uri}/authentication/confirmations/${confirmationId}/credentials/${credentialId}`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Confirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["confirmation"]);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {credentialId: credentialId};

    const uriAndPath: string = `${uri}/authentication/confirmations/credentials/${credentialId}/resend`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Confirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        console.log(body);
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["confirmation"]);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  resendConfirmCodeByUsername(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {username: username};

    const uriAndPath: string = `${uri}/authentication/confirmations/credentials/resend-by-username`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Confirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["confirmation"]);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  validateCode(credentialId: string, code: string, options?: HeaderBaseOptions): Observable<boolean> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const validateConfirmCodeJson = classToPlain(new ValidateConfirmCode(credentialId, code));

    const uriAndPath: string = `${uri}/authentication/confirmations/validate-code`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, validateConfirmCodeJson);

    return Observable.create(function (observer: Observer<Confirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        console.log(body);
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

}
