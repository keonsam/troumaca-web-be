import { Person } from "../data/party/person";
import { Observable } from "rxjs";

export interface PersonRepository {
  addPerson(person: Person): Observable<Person>;
  findPerson(searchStr: string, pageSize: number): Observable<Person[]>;

}
