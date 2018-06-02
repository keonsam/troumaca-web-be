import {User} from "./user/user";
import {Organization} from "./organization/organization";

export class AccountResponse {

  private _created:boolean;
  private _user:User;
  private _organization:Organization;

  constructor(created?: boolean, user?: User, organization?: Organization) {
    this._created = created;
    this._user = user;
    this._organization = organization;
  }

  get created(): boolean {
    return this._created;
  }

  set created(value: boolean) {
    this._created = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }
}
