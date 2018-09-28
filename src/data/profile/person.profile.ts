import {Person} from "../party/person";
import {Photo} from "../photo/photo";
// import {Credential} from "../authentication/credential";
// import {AccessRole} from "../authorization/access.role";

export class PersonProfile {

  private _person: Person;
  private _photo: Photo;

  // private _credential: Credential;
  // private _accessRole:AccessRole;

  get person(): Person {
    return this._person;
  }

  set person(value: Person) {
    this._person = value;
  }

  get photo(): Photo {
    return this._photo;
  }

  set photo(value: Photo) {
    this._photo = value;
  }

  // get credential(): Credential {
  //   return this._credential;
  // }

  // set credential(value: Credential) {
  //   this._credential = value;
  // }

  // get accessRole(): AccessRole {
  //   return this._accessRole;
  // }

  // set accessRole(value: AccessRole) {
  //   this._accessRole = value;
  // }

}