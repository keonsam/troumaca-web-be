import {Credential} from "../../../domain/model/authentication/credential";
import {CredentialDataProvider} from "../../../port/credential.data.provider";
import {Observable, Observer} from "rxjs";
import request from "request";
// import {classToPlain} from "class-transformer";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../request.helpers";
import {properties} from "../../../properties.helpers";
import {AuthenticatedCredential} from "../../../domain/model/authentication/authenticated.credential";
import {CreateCredentialResponse} from "../../../domain/model/authentication/dto/create.credential.response";
// import {CreateCredentialRequest} from "../../domain/model/authentication/request/create.credential.request";
// import {Person} from "../../domain/model/party/person";
import {Confirmation} from "../../../domain/model/authentication/confirmation";
import {ChangePasswordRequest} from "../../../domain/model/authentication/request/change.password.request";
// import { ChangeResponse } from "../../domain/model/authentication/dto/change.response";
import { HeaderBaseOptions } from "../../../header.base.options";
import { RegisterRequest } from "../../../domain/model/authentication/request/register.request";

export class RestCredentialDataProvider implements CredentialDataProvider {

  localhost = "http://localhost:8888";
  remote = true;
  constructor() {
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    let uri: string = this.remote ? properties.get("credential.host.port") as string : this.localhost;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {
      password: password
    };

    uri = uri + "/authentication/credentials/validate-password";

    const requestOptions: any = postJsonOptions(uri, headerMap, json);

    return Observable.create(function (observer: Observer<boolean>) {
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
    let uri: string = this.remote ? properties.get("credential.host.port") as string : this.localhost;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {username: username};

    uri = uri + "/authentication/credentials/validate-username";

    const requestOptions: any = postJsonOptions(uri, headerMap, json);

    return Observable.create(function (observer: Observer<boolean>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(error);
          } else {
            // let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
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

  // Todo: Response must be a superset that includes Confirmation
  addCredential(register: RegisterRequest, options?: HeaderBaseOptions): Observable<CreateCredentialResponse> {
    const uri: string = this.remote ? properties.get("registrar.host.port") as string : this.localhost;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const uriAndPath: string = `${uri}/registrar/register`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, register);

    return Observable.create(function (observer: Observer<CreateCredentialResponse>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          observer.error(error);
        } else {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            // Todo: Need fixing
            observer.next(body["createdCredentialResult"]["createdConfirmation"]["confirmationEvent"]["confirmation"]);
          }
        }
        observer.complete();
      });
    });
  }

  authenticate(credential: Credential, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
    const uri: string = this.remote ? properties.get("login.host.port") as string : this.localhost;


    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {
      username: credential.username,
      password: credential.password
    };

    const uriAndPath: string = `${uri}/login`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<AuthenticatedCredential>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
          } else if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            const authenticatedCredential: AuthenticatedCredential = new AuthenticatedCredential();
            authenticatedCredential.state = body["authenticatedCredential"]["state"];
            authenticatedCredential.confirmation = body["authenticatedCredential"]["confirmation"];
            authenticatedCredential.sessionId = body["sessionDto"]["createdSession"]["sessionEvent"]["session"]["sessionId"];
            observer.next(authenticatedCredential);
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
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
      username: username
    };

    const uriAndPath: string = `${uri}/authentication/credentials/forget-password`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<number>) {
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
    // change to a boolean
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
        confirmationId: changePassword.confirmationId,
        credentialId: changePassword.credentialId,
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        code: changePassword.code
    };

    const uriAndPath: string = `${uri}/authentication/credentials/changed-password-with-code`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<true>) {
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
