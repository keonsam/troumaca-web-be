// import {CredentialRepository} from "../../../repository/credential.repository";
import {createPersonRepository} from "../../../adapter/party/person.repository.factory";
import {PersonRepository} from "../../../repository/person.repository";
import {Person} from "../../../data/party/person";
import {Observable} from "rxjs";
import {PersonProfile} from "../../../data/profile/person.profile";

export class PersonProfileOrchestrator {

  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  createProfilePerson(profile: PersonProfile, options?: any): Observable<Person> {
    return this.personRepository.addPerson(profile.person, options);
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return this.personRepository.findPerson(searchStr, pageSize);
  }

}
