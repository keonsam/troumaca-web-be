import {Credential} from "../data/authentication/credential";
import {Person} from "../data/party/person";

export class CreateCredential {
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