import {Credential} from "../../data/authentication/credential";
import {CredentialRepository} from "../../repository/credential.repository";
import {Observable, Observer} from "rxjs";
import request from "request";
import {classToPlain} from "class-transformer";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import {properties} from "../../properties.helpers";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {CreatedCredential} from "../../data/authentication/created.credential";
import {CreateCredential} from "../../repository/create.credential";
import {Person} from "../../data/party/person";
import {Confirmation} from "../../data/authentication/confirmation";
import {ChangePasswordInput} from "../../graphql/authentication/dto/change.password.input";
import { ChangeResponse } from "../../data/authentication/change.response";
import { HeaderBaseOptions } from "../../header.base.options";
import { RegisterInput } from "../../graphql/authentication/dto/register.input";

export class CredentialRepositoryRestAdapter implements CredentialRepository {

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

  addCredential(register: RegisterInput, options?: HeaderBaseOptions): Observable<Confirmation> {
    const uri: string = this.remote ? properties.get("registrar.host.port") as string : this.localhost;

    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const uriAndPath: string = `${uri}/registrar/register`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, register);

    return Observable.create(function (observer: Observer<CreatedCredential>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          observer.error(error);
        } else {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["createdCredential"]["confirmationEvent"]["confirmation"]);
          }
        }
        observer.complete();
      });
    });
  }

  authenticate(credential: Credential, options?: HeaderBaseOptions): Observable<string> {
    const uri: string = this.remote ? properties.get("login.host.port") as string : this.localhost;


    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {
      username: credential.username,
      password: credential.password
    };

    const uriAndPath: string = `${uri}/login`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<number>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
          } else if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body["session"]["sessionId"]);
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

  changePassword(changePassword: ChangePasswordInput, options?: HeaderBaseOptions): Observable<boolean> {
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
