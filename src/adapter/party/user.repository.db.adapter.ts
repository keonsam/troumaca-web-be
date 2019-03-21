import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import { credentials, persons, users } from "../../db";
import {calcSkip} from "../../db.util";
import {Person} from "../../data/party/person";
import {CredentialRepositoryNeDbAdapter} from "../authentication/credential.repository.db.adapter";
import { Observable, Observer, of, throwError } from "rxjs";
import {switchMap, map} from "rxjs/operators";
import { UserMenu } from "../../data/party/user.menu";
import { UserMe } from "../../data/party/user.me";
import { Credential } from "../../data/authentication/credential";
import { generateUUID } from "../../uuid.generator";
import { generate } from "generate-password";

export class UserRepositoryNeDbAdapter implements UserRepository {

    private defaultPageSize: number = 10;

    findUser(searchStr: string, pageSize: number, options: any): Observable<User[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {
            firstName: {$regex: searchStrLocal},
            ownerPartyId: options["Owner-Party-Id"]
        } : {};
        return Observable.create(function (observer: Observer<User[]>) {
            persons.find(query).limit(100).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUsers(pageNumber: number, pageSize: number, order: string, options: any): Observable<User[]> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return this.getUsersLocal(pageNumber, pageSize, order, query)
            .pipe(switchMap(users => {
                if (!users || users.length < 1) {
                    return of(users);
                } else {
                    const partyIds: string[] = users.map(x => x.partyId);
                    return this.getCredentialByPartyIds(partyIds)
                        .pipe(map(credentials => {
                            if (!credentials || credentials.length < 1) {
                                return users;
                                // throw new Error(`getCredentialByPartyIds Failed ${credentials}`);
                            } else {
                                users.forEach(val => {
                                    const credential = credentials.find(x => x.partyId === val.partyId);
                                    val.username = credential ? credential.username : "";
                                });
                                return users;
                            }
                        }));
                }
            }));
    }

    getUserCount(options: any): Observable<number> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            persons.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUser(partyId: string, options?: any): Observable<User> {
        const query = {
            partyId,
            // ownerPartyId: options["Owner-Party-Id"]
        };
        return this.getUserLocal(query)
            .pipe(switchMap(user => {
                if (!user) return of(user);
                return this.getCredentialByPartyId(partyId)
                    .pipe(map(credential => {
                        if (!credential) {
                            return user;
                        } else {
                            user.username = credential.username;
                            return user;
                        }
                    }));
            }));
    }

    saveUser(person: Person, credential: Credential, partyAccessRoles: string[], options: any): Observable<User> {
        person.createdOn = new Date();
        person.modifiedOn = new Date();
        person.partyId = generateUUID();
        person.ownerPartyId = options["Owner-Party-Id"];
        return this.saveUserLocal(person)
            .pipe(switchMap(user => {
                if (!user) {
                    return throwError("failed to create person");
                } else if (!credential || credential.username) {
                    return of(user);
                } else {
                    credential.password = generate({length: 10, numbers: true});
                    credential.ownerPartyId = options["Owner-Party-Id"];
                    credential.status = "Active";
                    return this.createCredential(credential)
                        .pipe(map(cred => {
                            if (!cred) {
                                throw new Error("failed to create credential");
                            } else {
                                return user;
                            }
                        }));
                }
            }));
    }

    private saveUserLocal(person: Person): Observable<User> {
        return Observable.create(function (observer: Observer<User>) {
            persons.insert(person, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateUser(partyId: string, user: User, credential: Credential, partyAccessRoles: string[], options: any): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };
            user.modifiedOn = new Date();
            persons.update(query, user, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteUser(partyId: string, options: any): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };

            persons.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUserMe(options: any): Observable<UserMe> {
        const query = {partyId: options["Party-Id"]};
        return this.getUserLocal(query)
            .pipe(map(user => {
                if (!user) {
                    throw new Error("failed to get user");
                } else {
                    const userMe = new UserMe();
                    userMe.user = user;
                    return userMe;
                }
            }));
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

    updateUserMe(user: User, credential: Credential, options: any): Observable<number> {
        const query = {partyId: options["Party-Id"]};
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

    private getUsersLocal(pageNumber: number, pageSize: number, order: string, query: any): Observable<User[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<User[]>) {
            persons.find(query).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getCredentialByPartyIds(partyIds: string[]): Observable<Credential[]> {
        return Observable.create((observer: Observer<Credential[]>) => {
            const query = {partyId: {$in: partyIds}};
            credentials.find(query, (err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getCredentialByPartyId(partyId: string): Observable<Credential> {
        return Observable.create((observer: Observer<Credential>) => {
            const query = {partyId: partyId};
            credentials.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

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

    private createCredential(credential: Credential): Observable<Credential> {
        return Observable.create(function (observer: Observer<Credential>) {
            credentials.insert(credential, function (err: any, doc: any) {
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
            persons.update(query, user, {}, function (err: any, numReplaced: number) {
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
            credential.modifiedOn = new Date();
            credentials.update(query, credential, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getPerson(partyId: string, options: any): Observable<Person> {
        return undefined;
    }
}
