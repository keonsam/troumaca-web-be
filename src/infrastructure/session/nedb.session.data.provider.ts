import {SessionDataProvider} from "../../port/session.data.provider";
import {Session} from "../../domain/model/session/session";
import {Observable, Observer, of, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {sessions} from "../../db";
import {generateUUID} from "../../uuid.generator";
import {ValidSession} from "../../domain/model/session/valid.session";

export class NedbSessionDataProvider implements SessionDataProvider {


  isValidSession(sessionId: string): Observable<ValidSession> {
    const validSession: ValidSession = new ValidSession();
    if (!sessionId) {
      validSession.valid = false;
      return of(validSession);
    }
    return this.getSessionById(sessionId)
      .pipe(map(session => {
        if (!session) {
          throw new Error("Session can not be found.");
        } else if (session.expirationTime > new Date()) {
          validSession.valid = true;
          validSession.partyId = session.partyId;
          validSession.ownerPartyId = session.ownerPartyId;
          return validSession;
        } else {
          validSession.valid = false;
          return validSession;
        }
      }));
  }

  getSessionById(sessionId: string): Observable<Session> {
    return Observable.create(function (observer: Observer<Session>) {
      const query = {
        "sessionId": sessionId
      };

      sessions.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  expireSession(sessionId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        sessionId
      };

      const expirationTime = new Date();
      sessions.update(query, {$set: {expirationTime}}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  // getSessionByCredentialId(credentialId: string): Observable<Session> {
  //     return .Observable.create(function (observer: Observer<Session>) {
  //         const query = {
  //             "credentialId": credentialId
  //         };
  //
  //         sessions.findOne(query, function (err: any, doc: any) {
  //             if (!err) {
  //                 observer.next(doc);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }
  //
  // getSessionByPartyId(partyId: string): Observable<Session> {
  //     return .Observable.create(function (observer: Observer<Session>) {
  //         const query = {
  //             "partyId": partyId
  //         };
  //
  //         sessions.findOne(query, function (err: any, doc: any) {
  //             if (!err) {
  //                 observer.next(doc);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }
  //
  // updateSession(sessionId: string, session: Session): Observable<number> {
  //     return .Observable.create(function (observer: Observer<number>) {
  //         const query = {
  //             "sessionId": sessionId
  //         };
  //         sessions.update(query, session, {}, function (err: any, numReplaced: number) {
  //             if (!err) {
  //                 observer.next(numReplaced);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }
  //
  // updateSessionPartyId(sessionId: string, partyId: string): Observable<number> {
  //     return .Observable.create(function (observer: Observer<number>) {
  //         const query = {
  //             sessionId
  //         };
  //         sessions.update(query, {$set : {partyId}}, {}, function (err: any, numReplaced: number) {
  //             if (!err) {
  //                 observer.next(numReplaced);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }

  // USED BY OTHER REPO

  addSession(session: Session): Observable<Session> {

    session.sessionId = generateUUID();
    session.expirationTime = new Date(new Date().getTime() + (20 * 60000));
    session.createdOn = new Date();
    session.modifiedOn = new Date();
    if (!session.data) {
      session.data = new Map();
    }

    return Observable.create(function (observer: Observer<Session>) {
      sessions.insert(session, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}
