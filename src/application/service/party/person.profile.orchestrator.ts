// import {CredentialRepository} from "../../../repository/credential.data.provider";
import {createPersonDataProvider} from "../../../infrastructure/party/person.data.provider.factory";
import {PersonDataProvider} from "../../../port/person.data.provider";
import {Person} from "../../../domain/model/party/person";
import {Observable} from "rxjs";
import {PersonProfile} from "../../../domain/model/profile/person.profile";

export class PersonProfileOrchestrator {

  private personRepository: PersonDataProvider;

  constructor() {
    this.personRepository = createPersonDataProvider();
  }

  createProfilePerson(profile: PersonProfile, options?: any): Observable<Person> {
    return undefined;
    // return this.personRepository.addPerson(profile.person, options);
  }

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return undefined;
    // return this.personRepository.findPerson(searchStr, pageSize);
  }

}
