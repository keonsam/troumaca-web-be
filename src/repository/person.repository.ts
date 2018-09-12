import { Observable } from "rxjs/Observable";
import { Person } from "../data/party/person";

export interface PersonRepository {
  addPerson(person: Person): Observable<Person>;
  findPerson(searchStr: string, pageSize: number): Observable<Person[]>;

}
