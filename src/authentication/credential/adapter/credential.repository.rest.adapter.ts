import Rx from "rxjs";
import { Credential } from "../credential";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CredentialRepository } from "../credential.repository";
// import {Result} from "../../../result.success";
import request from "request";
import { classToPlain, plainToClass } from "class-transformer";
import { jsonRequestHeaderMap, postJsonOptions } from "../../../request.helpers";
import { properties } from "../../../properties.helpers";
import { CredentialConfirmation } from "../confirmation/credential.confirmation";
// import {ValidatedPassword} from "../confirmation/validated.password";
import { AuthenticatedCredential } from "../authenticated.credential";
// import {ValidatedUsername} from "../confirmation/validated.username";
import { Confirmation } from "../confirmation/confirmation";

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

      return Rx.Observable.create(function (observer: Observer<boolean>) {
          request(requestOptions, function (error: any, response: any, body: any) {
              try {
                  if (response && response.statusCode != 200) {
                      observer.error(error);
                      observer.complete();
                  } else {
                      observer.next(body["valid"]);
                      observer.complete();
                  }
              } catch (e) {
                  observer.error(new Error(e.message));
                  observer.complete();
              }
          });
      });
  }

  isValidUsername(username: string, options?: any): Observable<boolean> {
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
                      observer.error(body);
                      observer.complete();
                  } else {
                      // let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
                      observer.next(body["valid"]);
                      observer.complete();
                  }
              } catch (e) {
                  observer.error(new Error(e.message));
                  observer.complete();
              }
          });
      });
  }

  addCredential(credential: Credential, options?: any): Observable<Confirmation> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});
    // let headers:any = strMapToJson(headerMap);
    const credentialJson = classToPlain(credential);

    const uriAndPath: string = uri + "/authentication/credentials";

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, credentialJson);

    return Rx.Observable.create(function (observer: Observer<CredentialConfirmation>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          observer.error(error);
        } else {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            // let credentialObj = plainToClass(Credential, body);
            const credentialObject = plainToClass(Confirmation, body["confirmation"] as Object);
            console.log(body["confirmation"]);
            observer.next(body["confirmation"]);
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
              console.log(body);
              try {
                  if (error) {
                      observer.error(error);
                      observer.complete();
                  } else if (response && response.statusCode != 200) {
                      observer.error(body);
                      observer.complete();
                  } else {
                      // let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
                      observer.next(body);
                      observer.complete();
                  }
              } catch (e) {
                  observer.error(new Error(e.message));
                  observer.complete();
              }
          });
      });
  }

  // addUserCredential(credential:Credential):Observable<Credential> {
  //   return undefined;
  // }
  //
  //
  // authenticateCredential(credential:Credential): Observable<Credential> {
  //   return undefined;
  // }
  //
  // checkUsernameValid(partyId: string, username: string): Observable<Credential> {
  //   return undefined;
  // }
  //
  // getCredentialByCredentialId(credentialId: string): Observable<Credential> {
  //   return undefined;
  // }
  //
  // getCredentialByUsername(username: string): Observable<Credential> {
  //   return undefined;
  // }
  //
  //
  // isValidEditUsername(partyId: string, username:string): Observable<boolean> {
  //   return undefined;
  // }
  //
  // updateCredential(partyId: string, credential: Credential): Observable<number> {
  //   return null;
  // }
  //
  // updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
  //   return undefined;
  // }
  //
  // updateCredentialPartyId(credentialId: string, partyId: string): Observable<number> {
  //   return undefined;
  // }
  //
  // getSanitizeCredentialByUsername(credentialId: string): Observable<Credential> {
  //   return undefined;
  // }
  //
  //
  // deleteCredentialByPartyId(partyId:string): Observable<number> {
  //   return undefined;
  // }
  //
  // deleteCredentialById(credentialId: string, options?: any): Observable<number> {
  //   let uri:string = properties.get("credential.host.port") as string;
  //
  //   let headerMap = jsonRequestHeaderMap(options ? options : {});
  //
  //   // let headers:any = strMapToJson(headerMap);
  //   let json = {credentialId:credentialId};
  //
  //   let uriAndPath:string = uri + '/authentication/credentials/' + credentialId;
  //
  //   let requestOptions:any = postJsonOptions(uriAndPath, headerMap, json);
  //
  //   return Observable.create(function (observer:Observer<number>) {
  //     request(requestOptions, function (error:any, response:any, body:any) {
  //       try {
  //         if (response && response.statusCode != 200) {
  //           observer.error(body);
  //           observer.complete();
  //         } else {
  //           //let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
  //           observer.next(body["affected"]);
  //           observer.complete();
  //         }
  //       } catch (e) {
  //         observer.error(new Error(e.message));
  //         observer.complete();
  //       }
  //     });
  //   });
  // }

}
