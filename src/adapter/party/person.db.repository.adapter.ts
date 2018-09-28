import {PersonRepository} from "../../repository/person.repository";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../uuid.generator";
import {persons} from "../../db";
import {Person} from "../../data/party/person";

export class PersonDbRepositoryAdapter implements PersonRepository {

  addPerson(person: Person, options?: any): Observable<Person> {
    return Observable.create(function (observer: Observer<Person>) {
      person.partyId = generateUUID();
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

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    const searchStrLocal = new RegExp(searchStr);
    return Observable.create(function (observer: Observer<Person[]>) {
      persons.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
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
