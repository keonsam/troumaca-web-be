import {createPersonRepository} from "../../adapter/party/person.repository.factory";
import {PersonRepository} from "../../repository/person.repository";
import {Person} from "../../data/party/person";
import {Observable} from "rxjs";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { flatMap, map } from "rxjs/operators";
import { Credential } from "../../data/authentication/credential";
import { HeaderBaseOptions } from "../../header.base.options";
import { Sort } from "../../util/sort";
import { Persons } from "../../data/party/persons";

export class PersonOrchestrator {

  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  findPeople(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<Person[]> {
    return this.personRepository.findPeople(searchStr, pageSize, options);
  }

  getPersons(pageNumber: number, pageSize: number, sort: Sort, options: HeaderBaseOptions): Observable<Persons> {
    return this.personRepository.getPersons(pageNumber, pageSize, sort, options);
  }

  getPerson(partyId: any, options?: any): Observable<Person> {
    return this.personRepository.getPerson(partyId, options);
  }

  savePerson(person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<Person> {
    return this.personRepository.savePerson(person, credential, partyAccessRoles, options);
  }

  updatePerson(partyId: string, person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<number> {
    return this.personRepository.updatePerson(partyId, person, credential, partyAccessRoles, options);
  }

  deletePerson(partyId: string, options: HeaderBaseOptions): Observable<number> {
    return this.personRepository.deletePerson(partyId, options);
  }

}
