import { AccessRole } from "../access-role/access.role";

export class PartyAccessRole {
  private _partyAccessRoleId: string;
  private _partyId: string;
  private _accessRoleId: string;
  private _accessRole: AccessRole;
  private _effectiveDate: Date;
  private _untilDate: Date;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get partyAccessRoleId(): string {
    return this._partyAccessRoleId;
  }

  set partyAccessRoleId(value: string) {
    this._partyAccessRoleId = value;
  }

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
  }

  get accessRole(): AccessRole {
    return this._accessRole;
  }

  set accessRole(value: AccessRole) {
    this._accessRole = value;
  }

  get effectiveDate(): Date {
    return this._effectiveDate;
  }

  set effectiveDate(value: Date) {
    this._effectiveDate = value;
  }

  get untilDate(): Date {
    return this._untilDate;
  }

  set untilDate(value: Date) {
    this._untilDate = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }
}
