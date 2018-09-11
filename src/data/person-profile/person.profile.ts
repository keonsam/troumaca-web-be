import {Person} from "./person";
import {Credential} from "./credential";
import {AccessRole} from "./access.role";

export class PersonProfile {

  private _person: Person;
  private _credential: Credential;
  private _accessRole:AccessRole;

  get person(): Person {
    return this._person;
  }

  set person(value: Person) {
    this._person = value;
  }

  get credential(): Credential {
    return this._credential;
  }

  set credential(value: Credential) {
    this._credential = value;
  }

  get accessRole(): AccessRole {
    return this._accessRole;
  }

  set accessRole(value: AccessRole) {
    this._accessRole = value;
  }

}
