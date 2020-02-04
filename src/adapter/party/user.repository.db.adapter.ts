import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import { credentials, persons } from "../../db";
import { Observable, Observer, throwError } from "rxjs";
import {switchMap, map} from "rxjs/operators";
import { UserMenu } from "../../data/party/user.menu";
import { UserMe } from "../../data/party/user.me";
import { Credential } from "../../data/authentication/credential";
import { HeaderBaseOptions } from "../../header.base.options";

export class UserRepositoryNeDbAdapter implements UserRepository {

    private defaultPageSize: number = 10;

    getUserMe(options: HeaderBaseOptions): Observable<UserMe> {
        return Observable.create(function (observer: Observer<User>) {
            persons.findOne({partyId: options.partyId}, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUserMenu(options: any): Observable<UserMenu> {
        const userMenu: UserMenu = new UserMenu();
        const query = {partyId: options["Party-Id"]};
        return this.getUserLocal(query)
            .pipe(map(user => {
                if (!user) {
                    throw new Error("get user failed");
                } else {
                    userMenu.name = `${user.firstName} ${user.lastName}`;
                    return userMenu;
                }
            }));
    }

    updateUserMe(user: User, credential: Credential, options: HeaderBaseOptions): Observable<number> {
        const query = {partyId: options.partyId};
        return this.updateUserMeLocal(query, user)
            .pipe(switchMap(num => {
                if (!num) {
                    return throwError("failed to update user");
                } else if (!credential) {
                    return num;
                } else {
                    return this.updateUserMeCredentialLocal(query, credential)
                        .pipe(map(num2 => {
                            if (num2) {
                                throw new Error("failed to update credential");
                            } else {
                                return (num + num2);
                            }
                        }));
                }
            }));
    }


    // HELPERS

    private getUserLocal(query: any): Observable<User> {
        return Observable.create(function (observer: Observer<User>) {
            persons.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private updateUserMeLocal(query: any, user: User): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            user.modifiedOn = new Date();
            persons.update(query, { $set: user}, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private updateUserMeCredentialLocal(query: any, credential: Credential): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            credential.modifiedOn = Date.now();
            credentials.update(query, { $set: credential}, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
}
