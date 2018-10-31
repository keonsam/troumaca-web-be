import {User} from "./user";
import {Organization} from "./organization";

export class AccountResponse {

  constructor(created?: boolean, user?: User, organization?: Organization) {
    this._created = created;
    this._user = user;
    this._organization = organization;
  }

  private _created: boolean;

  get created(): boolean {
    return this._created;
  }

  set created(value: boolean) {
    this._created = value;
  }

  private _user: User;

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  private _organization: Organization;

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }
}
