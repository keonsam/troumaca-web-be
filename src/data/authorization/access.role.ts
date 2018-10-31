import {AccessRoleType} from "./access.role.type";

export class AccessRole {

  private _accessRoleId: string;

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _accessRoleTypeId: string;

  get accessRoleTypeId(): string {
    return this._accessRoleTypeId;
  }

  set accessRoleTypeId(value: string) {
    this._accessRoleTypeId = value;
  }

  private _accessRoleType: AccessRoleType;

  get accessRoleType(): AccessRoleType {
    return this._accessRoleType;
  }

  set accessRoleType(value: AccessRoleType) {
    this._accessRoleType = value;
  }

  private _prohibitionIndicator: boolean;

  get prohibitionIndicator(): boolean {
    return this._prohibitionIndicator;
  }

  set prohibitionIndicator(value: boolean) {
    this._prohibitionIndicator = value;
  }

  private _effectiveDate: Date;

  get effectiveDate(): Date {
    return this._effectiveDate;
  }

  set effectiveDate(value: Date) {
    this._effectiveDate = value;
  }

  private _untilDate: Date;

  get untilDate(): Date {
    return this._untilDate;
  }

  set untilDate(value: Date) {
    this._untilDate = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _ownerPartyId: string;

  get ownerPartyId(): string {
    return this._ownerPartyId;
  }

  set ownerPartyId(value: string) {
    this._ownerPartyId = value;
  }

  private _createdOn: Date;

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  private _modifiedOn: Date;

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }
}
