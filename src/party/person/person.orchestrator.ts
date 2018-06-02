import {createPersonRepository} from './person.repository.factory';
import {PersonRepository} from "./person.repository";
import {Observable} from "rxjs/Observable";
import {Person} from "./person";

export class PersonOrchestrator {

  private personRepository:PersonRepository;

  constructor() {
    this.personRepository = createPersonRepository();
  }

  findPerson(searchStr:string, pageSize:number):Observable<Person[]> {
    return this.personRepository.findPerson(searchStr, pageSize);
  }

}
