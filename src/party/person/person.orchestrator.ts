import {createPersonRepository} from "../../adapter/party/person.repository.factory";
import {PersonRepository} from "../../repository/person.repository";
import {Person} from "../../data/party/person";
import {Observable} from "rxjs";

export class PersonOrchestrator {

  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return this.personRepository.findPerson(searchStr, pageSize);
  }

}
