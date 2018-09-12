import { Observable } from "rxjs/Observable";
import {CredentialRepository} from "../../../repository/credential.repository";
import {createPersonRepository} from "../../../adapter/party/person.repository.factory";
import {PersonRepository} from "../../../repository/person.repository";
import {Person} from "../../../data/party/person";

export class CreatePersonProfileOrchestrator {

  private personRepository: PersonRepository;
  private credentialRepository: CredentialRepository;

  constructor() {
    this.personRepository = createPersonRepository();
    //this.credentialRepository =
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return this.personRepository.findPerson(searchStr, pageSize);
  }

}
