import * as Rx from 'rxjs';
import {UserRepository} from "./user.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {User} from "./user";
import {users} from "../../db";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";
import {Person} from "../person/person";

class UserDBRepository implements UserRepository {

  private defaultPageSize:number = 10;

  findUser(searchStr:string, pageSize:number):Observable<User[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer: Observer<User[]>) {
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
      };
    });
  }

  getUsers(pageNumber:number, pageSize:number, order:string):Observable<User[]> {
    let defaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<User[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      users.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getUserCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      users.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getUser(partyId:string):Observable<User> {
    return Rx.Observable.create(function (observer:Observer<User>) {
      let query = {
       partyId
      };

      users.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPerson(partyId:string):Observable<Person> {
    return Rx.Observable.create(function (observer:Observer<Person>) {
      let query = {
        "partyId": partyId
      };
      users.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPersonByIds(partyIds:string[]):Observable<Person[]> {
    return Rx.Observable.create(function (observer:Observer<Person[]>) {
      // let query = {
      //   "partyId": partyId
      // };
      users.find({partyId:{$in:partyIds}}, function (err:any, docs:any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveUser(user:User):Observable<User> {
    user.partyId = generateUUID();
    return Rx.Observable.create(function (observer:Observer<User>) {
      users.insert(user, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteUser(partyId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };

      users.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  updateUser(partyId:string, user:User):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };
      users.update(query, user, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }
}

class UserRestRepository implements UserRepository {

  findUser(searchStr:string, pageSize:number):Observable<User[]> {
    return undefined;
  }

  deleteUser(partyId: string): Observable<number> {
    return undefined;
  }

  getUser(partyId: string): Observable<User> {
    return undefined;
  }

  getPerson(partyId:string):Observable<Person> {
    return undefined
  }

  getPersonByIds(partyIds:string[]):Observable<Person[]> {
    return undefined
  }

  getUserCount(): Observable<number> {
    return undefined;
  }

  getUsers(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
    return undefined;
  }

  saveUser(user: User): Observable<User> {
    return undefined;
  }

  updateUser(partyId: string, user: User): Observable<number> {
    return undefined;
  }
}

export function createUserRepository(kind?:RepositoryKind):UserRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new UserDBRepository();
    case RepositoryKind.Rest:
      return new UserRestRepository();
    default:
      return new UserDBRepository();
  }
}
