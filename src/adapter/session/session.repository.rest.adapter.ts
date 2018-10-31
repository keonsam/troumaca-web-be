import {SessionRepository} from "../../repository/session.repository";
import {Session} from "../../data/session/session";
import {Observable, Observer, throwError} from "rxjs";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import request from "request";
import {ValidSession} from "../../data/session/valid.session";

export class SessionRepositoryRestAdapter implements SessionRepository {

  isValidSession(sessionId: string, options?: any): Observable<ValidSession> {
    // TODO: fix this please
    return throwError(undefined);
    // const uri: string = properties.get("session.host.port") as string;
    //
    // const headerMap = jsonRequestHeaderMap(options ? options : {});
    //
    // // let headers:any = strMapToJson(headerMap);
    // const json = {
    //     "sessionId": sessionId
    // };
    //
    // const uriAndPath: string = uri + `/sessions/${sessionId}/active`;
    //
    // const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);
    //
    // return Observable.create(function (observer: Observer<boolean>) {
    //     request(requestOptions, function (error: any, response: any, body: any) {
    //         console.log(body);
    //         try {
    //             if (error) {
    //                 observer.error(error);
    //                 observer.complete();
    //             } else if (response && response.statusCode != 200) {
    //                 observer.next(false);
    //                 observer.complete();
    //             } else {
    //                 // let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
    //                 observer.next(body);
    //                 observer.complete();
    //             }
    //         } catch (e) {
    //             observer.error(new Error(e.message));
    //             observer.complete();
    //         }
    //     });
    // });
  }

  getSessionById(sessionId: string, options?: any): Observable<Session> {
    const uri: string = properties.get("session.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {
      "sessionId": sessionId
    };

    const uriAndPath: string = uri + `/sessions/${sessionId}`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<boolean>) {
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

  expireSession(sessionId: string, options: any): Observable<number> {
    return undefined;
  }

  // getOrCreate(session: Session): Observable<Session> {
  //     return undefined;
  // }
  //
  // getSessionByCredentialId(credentialId: string): Observable<Session> {
  //     return undefined;
  // }
  //
  // getSessionByPartyId(partyId: string): Observable<Session> {
  //     return undefined;
  // }
  //
  // updateSession(sessionId: string, session: Session): Observable<number> {
  //     return undefined;
  // }
  //
  // updateSessionPartyId(sessionId: string, partyId: string): Observable<number> {
  //     return undefined;
  // }

  // USED BY OTHER REPO

  addSession(session: Session, options?: any): Observable<Session> {
    const uri: string = properties.get("session.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    // let headers:any = strMapToJson(headerMap);
    const json = {
      "session": session
    };

    const uriAndPath: string = uri + `/sessions`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<boolean>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
            observer.complete();
          } else if (response && response.statusCode != 200) {
            observer.next(undefined);
            observer.complete();
          } else {
            // let vp:boolean = plainToClass(Boolean, body["valid"] as Object);
            observer.next(body["session"]);
            observer.complete();
          }
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }


}