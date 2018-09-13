import { UserRepository } from "../../repository/user.repository";
import { Observable } from "rxjs/Observable";
import { User } from "../../data/party/user";
import { Observer } from "rxjs/Observer";
import { users } from "../../db";
import { calcSkip } from "../../db.util";
import { Person } from "../../data/party/person";
import { CredentialRepositoryNeDbAdapter } from "../authentication/credential.repository.db.adapter";

export class UserRepositoryNeDbAdapter implements UserRepository {

    private defaultPageSize: number = 10;
    private credentialRepositoryNeDbAdapter: CredentialRepositoryNeDbAdapter = new  CredentialRepositoryNeDbAdapter();

    findUser(searchStr: string, pageSize: number): Observable<User[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {firstName: {$regex: searchStrLocal}} : {};
        return Observable.create(function (observer: Observer<User[]>) {
            users.find(query).limit(100).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUsers(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
        return this.getUsersLocal(pageNumber, pageSize, order)
            .switchMap( users => {
                if (users.length < 1) return Observable.of(users);
               const partyIds: string[] = users.map(x => x.partyId);
               return this.credentialRepositoryNeDbAdapter.getCredentialByPartyIds(partyIds)
                   .map( credentials => {
                       users.forEach( val => {
                           val.username = credentials.find(x => x.partyId === val.partyId).username;
                       });
                       return users;
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
        return this.getUserLocal(partyId)
            .switchMap(user => {
               if (!user) return Observable.of(user);
               return this.credentialRepositoryNeDbAdapter.getCredentialByPartyId(partyId)
                   .map(credential => {
                      user.username = credential.username;
                      return user;
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

    // HELPERS

    getUsersLocal(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
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

    getUserLocal(partyId: string): Observable<User> {
        return Observable.create(function (observer: Observer<User>) {
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
}