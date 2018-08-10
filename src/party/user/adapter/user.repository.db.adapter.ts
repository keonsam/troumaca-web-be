import { UserRepository } from "../user.repository";
import { Observable } from "rxjs/Observable";
import { User } from "../user";
import { Observer } from "rxjs/Observer";
import { users } from "../../../db";
import { calcSkip } from "../../../db.util";
import { Person } from "../../person/person";
import { generateUUID } from "../../../uuid.generator";

export class UserRepositoryNeDbAdapter implements UserRepository {

    private defaultPageSize: number = 10;

    findUser(searchStr: string, pageSize: number): Observable<User[]> {
        const searchStrLocal = new RegExp(searchStr);
        return Observable.create(function (observer: Observer<User[]>) {
            if (!searchStr) {
                users.find({}).limit(100).exec(function (err: any, doc: any) {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            } else {
                users.find({firstName: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            }
        });
    }

    getUsers(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<User[]>) {
            users.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUserCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            users.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUser(partyId: string): Observable<User> {
        return Observable.create(function (observer: Observer<User>) {
            const query = {
                partyId
            };

            users.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getPerson(partyId: string): Observable<Person> {
        return Observable.create(function (observer: Observer<Person>) {
            const query = {
                "partyId": partyId
            };
            users.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }


    saveUser(user: User): Observable<User> {
        if (!user.partyId) {
            user.partyId = generateUUID();
        }
        return Observable.create(function (observer: Observer<User>) {
            users.insert(user, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteUser(partyId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };

            users.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateUser(partyId: string, user: User): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };
            users.update(query, user, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    
    // USED BY OTHER REPOS
    getUsersByIds(partyIds: string[]): Observable<User[]> {
        return Observable.create( (observer: Observer<User[]>) => {
            users.find({partyId: {$in: partyIds}}, function (err: any, docs: any) {
               if (!err) {
                   observer.next(docs);
               } else {
                   observer.error(err);
               }
               observer.complete();
            });
        });
    }
}