import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import { persons, users } from "../../db";
import {calcSkip} from "../../db.util";
import {Person} from "../../data/party/person";
import {CredentialRepositoryNeDbAdapter} from "../authentication/credential.repository.db.adapter";
import { Observable, Observer, of, throwError } from "rxjs";
import {switchMap, map} from "rxjs/operators";
import { UserMenu } from "../../data/party/user.menu";

export class UserRepositoryNeDbAdapter implements UserRepository {

  private defaultPageSize: number = 10;
  private credentialRepositoryNeDbAdapter: CredentialRepositoryNeDbAdapter = new CredentialRepositoryNeDbAdapter();

  findUser(searchStr: string, pageSize: number): Observable<User[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {firstName: {$regex: searchStrLocal}} : {};
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

  getUsers(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
    return this.getUsersLocal(pageNumber, pageSize, order)
      .pipe(switchMap(users => {
        if (!users || users.length < 1) {
          return of(users);
        } else {
          const partyIds: string[] = users.map(x => x.partyId);
          return this.credentialRepositoryNeDbAdapter.getCredentialByPartyIds(partyIds)
            .pipe(map(credentials => {
              if (!credentials || credentials.length < 1) {
                throw new Error(`getCredentialByPartyIds Failed ${credentials}`);
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

  getUserCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      persons.count({}, function (err: any, count: number) {
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
      .pipe(switchMap(user => {
        if (!user) return of(user);
        return this.credentialRepositoryNeDbAdapter.getCredentialByPartyId(partyId)
          .pipe(map(credential => {
            user.username = credential.username;
            return user;
          }));
      }));
  }

  getPerson(partyId: string): Observable<Person> {
    return Observable.create(function (observer: Observer<Person>) {
      const query = {
        "partyId": partyId
      };
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

  saveUser(person: Person): Observable<User> {
    person.createdOn = new Date();
    person.modifiedOn = new Date();
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

  updateUser(partyId: string, user: User): Observable<number> {
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

  deleteUser(partyId: string): Observable<number> {
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

  // USED BY OTHER REPOS
  getUsersByIds(partyIds: string[]): Observable<User[]> {
    return Observable.create((observer: Observer<User[]>) => {
      persons.find({partyId: {$in: partyIds}}, function (err: any, docs: any) {
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
      persons.find({}).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
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

  getUserMenu(partyId: string): Observable<UserMenu> {
    const userMenu: UserMenu = new UserMenu();
    return this.getPerson(partyId)
        .pipe(map(user => {
          if (!user) {
             throw new Error("get user failed");
          } else {
            userMenu.name = `${user.firstName} ${user.lastName}`;
            return userMenu;
          }
        }));
  }
}
