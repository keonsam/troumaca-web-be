import {PersonRepository} from "../../repository/person.repository";
import {Person} from "../../data/party/person";
import {Observable} from "rxjs";

export class PersonRestRepositoryAdapter implements PersonRepository {
  addPerson(person: Person): Observable<Person> {
    return undefined;
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return undefined;
  }
}
