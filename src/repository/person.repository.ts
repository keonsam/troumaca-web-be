import {Person} from "../data/party/person";
import {Observable} from "rxjs";
import { Credential } from "../data/authentication/credential";
import { HeaderBaseOptions } from "../header.base.options";
import { Sort } from "../util/sort";
import { Persons } from "../data/party/persons";

export interface PersonRepository {

  findPeople(searchStr: string, options: HeaderBaseOptions): Observable<Person[]>;

  getPersons(pageNumber: number, pageSize: number, order: Sort, options: HeaderBaseOptions): Observable<Persons>;

  getPerson(partyId: string, options: HeaderBaseOptions): Observable<Person>;

  savePerson(person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<Person>;

  deletePerson(partyId: string, options: HeaderBaseOptions): Observable<number>;

  updatePerson(partyId: string, person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<number>;

  updatePersonMe(partyId: string, person: Person, options: HeaderBaseOptions): Observable<number>;

}
