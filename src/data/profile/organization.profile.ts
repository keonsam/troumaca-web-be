import {Organization} from "../party/organization";
import {AccessRole} from "../authorization/access.role";
import {Person} from "../party/person";

export class OrganizationProfile {

  private _organization: Organization;
  private _accessRoles: AccessRole[];
  private _person: Person;

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }

  get person(): Person {
    return this._person;
  }

  set person(value: Person) {
    this._person = value;
  }

  get accessRoles(): AccessRole[] {
    return this._accessRoles;
  }

  set accessRoles(value: AccessRole[]) {
    this._accessRoles = value;
  }

}
