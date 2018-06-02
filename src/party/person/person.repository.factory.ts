import * as Rx from 'rxjs';
import {PersonRepository} from "./person.repository";
import {Observable} from "rxjs/Observable";
import {Person} from "./person";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {persons} from "../../db";
import {generateUUID} from "../../uuid.generator";

class PersonDBRepository implements PersonRepository {

  addPerson(person: Person): Observable<Person> {
    return Rx.Observable.create(function (observer:Observer<Person>) {
      person.partyId = generateUUID();
      persons.insert(person, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  findPerson(searchStr:string, pageSize:number):Observable<Person[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer:Observer<Person[]>) {
      persons.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err:any, doc:any) {
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

class PersonRestRepository implements PersonRepository {
  addPerson(person: Person): Observable<Person> {
    return undefined;
  }

  findPerson(searchStr:string, pageSize:number): Observable<Person[]> {
    return undefined;
  }
}

export function createPersonRepository(kind?:RepositoryKind):PersonRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PersonDBRepository();
    case RepositoryKind.Rest:
      return new PersonRestRepository();
    default:
      return new PersonDBRepository();
  }
}
