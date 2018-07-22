import {CredentialConfirmation} from "../credential.confirmation";
import {ConfirmationRepository} from "../confirmation.repository";
import {Observable} from "rxjs/Observable";
import {properties} from "../../../../properties.helpers";
import {Observer} from "rxjs/Observer";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../../request.helpers";
import request from "request";
import { Confirmation } from "../confirmation";
// import {classToPlain, plainToClass} from "class-transformer";

export class ConfirmationRepositoryRestAdapter implements ConfirmationRepository {
  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation): Observable<CredentialConfirmation> {
    return undefined;
  }

  confirmCode(confirmationId:string, credentialId:string, confirmation: Confirmation, options?:any):Observable<boolean> {
    console.log("confirmCodeWOrks");
    let uri:string = properties.get("credential.host.port") as string;

    let headerMap = jsonRequestHeaderMap(options ? options : {});

    // let headers:any = strMapToJson(headerMap);
    let json = confirmation;

    let uriAndPath:string = uri + "/authentication/confirmations/" + confirmationId + "/credentials/" + credentialId;

    let requestOptions:any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer:Observer<number>) {
      request(requestOptions, function (error:any, response:any, body:any) {
        console.log("confirmationCode");
        console.log(body);
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
            observer.complete();
          } else {
            //let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
            observer.next(body["affected"]);
            observer.complete();
          }
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

  resendConfirmCode(confirmationId:string, credentialId:string, options?:any):Observable<boolean> {
    let uri:string = properties.get("credential.host.port") as string;

    let headerMap = jsonRequestHeaderMap(options ? options : {});
    // let headers:any = strMapToJson(headerMap);
    let json = {credentialId:credentialId};

    let uriAndPath:string = uri + "/authentication/confirmations/credentials/" + credentialId + "/resend";

    let requestOptions:any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer:Observer<number>) {
      request(requestOptions, function (error:any, response:any, body:any) {
        console.log(body);
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
            observer.complete();
          } else {
            //let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
            observer.next(body["confirmation"]);
            observer.complete();
          }
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationByCredentialId(credentialId:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationById(credentialConfirmationId:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation): Observable<number> {
    return undefined;
  }

  getConfirmedConfirmation(credentialId:string):Observable<CredentialConfirmation> {
    return undefined;
  }
}
