import {Organization} from "../party/organization/organization";
import {AccessRole} from "../authorization/access.role";
import {Person} from "../party/person/person";

export class OrganizationProfile {

  private _organization: Organization;

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }

  private _accessRoles: AccessRole[];

  get accessRoles(): AccessRole[] {
    return this._accessRoles;
  }

  set accessRoles(value: AccessRole[]) {
    this._accessRoles = value;
  }

  private _person: Person;

  get person(): Person {
    return this._person;
  }

  set person(value: Person) {
    this._person = value;
  }

}
