import { Observable } from "rxjs";
import { Person } from "./person";

export interface PersonRepository {

  addPerson(person: Person): Observable<Person>;
  findPerson(searchStr: string, pageSize: number): Observable<Person[]>;

}
