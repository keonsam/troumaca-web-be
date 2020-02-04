import {createPersonDataProvider} from "../../../infrastructure/party/person.data.provider.factory";
import {PersonDataProvider} from "../../../port/person.data.provider";
import {Person} from "../../../domain/model/party/person/person";
import {Observable} from "rxjs";
import { Credential } from "../../../domain/model/authentication/credential";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Sort } from "../../../util/sort";
import { Persons } from "../../../domain/model/party/person/persons";

export class PersonOrchestrator {

  private personRepository: PersonDataProvider;

  constructor() {
    this.personRepository = createPersonDataProvider();
  }

  findPeople(searchStr: string, options: HeaderBaseOptions): Observable<Person[]> {
    return this.personRepository.findPeople(searchStr, options);
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
