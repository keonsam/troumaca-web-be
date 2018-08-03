import { SessionRepository } from "../session.repository";
import { Observable } from "rxjs/Observable";
import { Session } from "../session";
import Rx from "rxjs";
import { Observer } from "rxjs/Observer";
import { sessions } from "../../db";
import { generateUUID } from "../../uuid.generator";

export class SessionRepositoryNeDbAdapter implements SessionRepository {


    isValidSession(sessionId: string): Observable<boolean> {
        if (!sessionId) {
            return Observable.of(false);
        }
        return this.getSessionById(sessionId).map(session => {
            if (!session) {
                // the method below might throw an undefined error
                return false;
            }
            const readSessionId = session.sessionId;
            if (!readSessionId) {
                return false;
            }

            const readExpirationDate = session.expirationTime;
            if (!readExpirationDate) {
                return false;
            }

            const now = new Date();

            return readExpirationDate  > now;
        });
    }

    getSessionById(sessionId: string): Observable<Session> {
        return Rx.Observable.create(function (observer: Observer<Session>) {
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
        return Rx.Observable.create(function (observer: Observer<number>) {
            const query = {
                sessionId
            };

            const expirationTime = new Date();
            sessions.update(query, {$set : {expirationTime}}, {}, function (err: any, numReplaced: number) {
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
    //     return Rx.Observable.create(function (observer: Observer<Session>) {
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
    //     return Rx.Observable.create(function (observer: Observer<Session>) {
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
    //     return Rx.Observable.create(function (observer: Observer<number>) {
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
    //     return Rx.Observable.create(function (observer: Observer<number>) {
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
        session.expirationTime = new Date(new Date().getTime() + (20 * 60 * 1000));
        session.createdOn = new Date();
        session.modifiedOn = new Date();
        if (!session.data) {
            session.data = new Map();
        }

        return Rx.Observable.create(function (observer: Observer<Session>) {
            sessions.insert(session.toJson(), function (err: any, doc: any) {
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