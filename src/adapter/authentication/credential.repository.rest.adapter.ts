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

export class CredentialRepositoryRestAdapter implements CredentialRepository {

  constructor() {
  }

  isValidPassword(password: string, options?: any): Observable<boolean> {
    let uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

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

  isValidUsername(username: string, partyId: string, options?: any): Observable<boolean> {
    let uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

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

  addCredential(person: Person, credential: Credential, options?: any): Observable<CreatedCredential> {
    const uri: string = properties.get("credential.host.port") as string;

    const createCredential: CreateCredential = new CreateCredential(person, credential);

    const headerMap = jsonRequestHeaderMap(options ? options : {});
    // let headers:any = strMapToJson(headerMap);
    const credentialJson = classToPlain(createCredential);

    const uriAndPath: string = uri + "/authentication/credentials";

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, credentialJson);

    return Observable.create(function (observer: Observer<CreatedCredential>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        const statusCode = response.statusCode;
        console.log("response.statusCode " + statusCode);
        if (error) {
          observer.error(error);
        } else {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        }
        observer.complete();
      });
    });
  }

  authenticate(credential: Credential, options: any): Observable<AuthenticatedCredential> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {
      username: credential.username,
      password: credential.password
    };

    const uriAndPath: string = uri + "/authentication/authenticate";

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<number>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
          } else if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            // let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
            observer.next(body);
          }
          observer.complete();
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

  forgetPassword(credential: Credential, options: any): Observable<Confirmation> {
    return undefined;
  }

  updateCredential(partyId: string, credential: Credential): Observable<number> {
      return undefined;
  }

  deleteCredentialByPartyId(partyId: string): Observable<number> {
    return undefined;
  }

  public updateCredentialStatusByPartyId(partyId: string, status: string): Observable<number> {
    return undefined;
  }

}
