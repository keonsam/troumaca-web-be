import {Credential} from "../../../domain/model/authentication/credential";
import { credentials } from "../../../db";
import {AuthenticatedCredential} from "../../../domain/model/authentication/authenticated.credential";
import {Observable, Observer, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Session } from "../../../domain/model/session/session";
import { NedbSessionDataProvider } from "../../session/nedb.session.data.provider";
import {LoginDataProvider} from "../../../port/login.data.provider";

export class NedbLoginDataProvider implements LoginDataProvider {

    private sessionRepositoryNeDbAdapter: NedbSessionDataProvider = new NedbSessionDataProvider();

    authenticate(username: string, password: string, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
        return this.getCredentialByUsername(username)
            .pipe(switchMap((credential: Credential) => {
                if (!credential) {
                    return throwError("username not found");
                } else if (password !== credential.password) {
                    return throwError("password does not match");
                } else {
                    return this.addSession(credential).pipe( map( val => {
                        const authenticatedCredential: AuthenticatedCredential = new AuthenticatedCredential();
                        authenticatedCredential.sessionId = val;
                        return authenticatedCredential;
                    }));
                }
            }));
    }

    private getCredentialByUsername(username: string): Observable<Credential> {
        return new Observable(observer => {
            const query = {
                "username": username
            };

            credentials.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private addSession(credential: Credential): Observable<string> {
        const session: Session = new Session();
        session.partyId = credential.partyId;
        //session.ownerPartyId = credential.ownerPartyId;
        session.credentialId = credential.credentialId;
        session.data.set("status", credential.status);
        return this.sessionRepositoryNeDbAdapter.addSession(session)
            .pipe(switchMap(session => {
                if (!session) {
                    return throwError("Session was not created.");
                } else {
                    return of(session.sessionId);
                }
            }));
    }

}
