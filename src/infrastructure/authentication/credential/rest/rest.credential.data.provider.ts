import {CredentialDataProvider} from "../../../../port/credential.data.provider";
import {Observable} from "rxjs";
import request from "request";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../../request.helpers";
import {Confirmation} from "../../../../domain/model/authentication/confirmation";
import {ChangePasswordRequest} from "../../../../domain/model/authentication/request/change.password.request";
import { HeaderBaseOptions } from "../../../../header.base.options";
import {Service} from "typedi";

@Service("restCredentialDataProvider")
export class RestCredentialDataProvider implements CredentialDataProvider {

  constructor(private registrarUrl: string) {
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {password: password};

    const uriAndPath: string = `${this.registrarUrl}/authentication/credentials/validate-password`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return new Observable(observer => {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(error);
          } else {
            observer.next(body["valid"]);
          }
          observer.complete();
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {username: username};

    const uriAndPath: string = `${this.registrarUrl}/authentication/credentials/validate-username`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return new Observable(observer => {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(error);
          } else {
            observer.next(body["valid"]);
          }
          observer.complete();
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
      username: username
    };

    const uriAndPath: string = `${this.registrarUrl}/authentication/credentials/forget-password`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return new Observable(observer => {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
          } else if (response && response.statusCode != 200) {
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

  changePassword(changePassword: ChangePasswordRequest, options?: HeaderBaseOptions): Observable<boolean> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
        confirmationId: changePassword.confirmationId,
        credentialId: changePassword.credentialId,
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        code: changePassword.code
    };

    const uriAndPath: string = `${this.registrarUrl}/authentication/credentials/changed-password-with-code`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return new Observable(observer => {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
          } else if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["changed"]);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }
}
