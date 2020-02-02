import {Credential} from "../credential";
import {Person} from "../../party/person";

export class CreateCredentialRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor(person: Person, credential: Credential) {
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.username = credential.username;
    this.password = credential.password;
  }
}