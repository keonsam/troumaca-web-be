import { createPersonRepository } from "../../../adapter/party/person.repository.factory";
import { PersonRepository } from "../../../repository/person.repository";
import { Observable } from "rxjs/Observable";
import {Person} from "../../../data/party/person";

export class ReadPersonProfileOrchestrator {

  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return this.personRepository.findPerson(searchStr, pageSize);
  }

}
