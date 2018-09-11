import { createPersonRepository } from "./person.profile.repository.factory";
import { PersonRepository } from "./person.profile.repository";
import { Observable } from "rxjs/Observable";
import { PersonProfile } from "./person.profile";

export class PersonProfileOrchestrator {

  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  findPerson(searchStr: string, pageSize: number): Observable<PersonProfile[]> {
    return this.personRepository.findPerson(searchStr, pageSize);
  }

}
