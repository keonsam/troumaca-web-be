import {createPersonRepository} from "../../../infrastructure/party/person.data.provider.factory";
import {PersonDataProvider} from "../../../port/person.data.provider";
import {Person} from "../../../domain/model/party/person";
import {Observable} from "rxjs";

export class PersonProfileOrchestrator {

  private personRepository: PersonDataProvider;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return undefined;
    // return this.personRepository.findPerson(searchStr, pageSize);
  }

}
