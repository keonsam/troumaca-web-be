export class AccessRoleType {

  private _accessRoleTypeId: string;
  private _name: string;
  private _description: string;
  private _ownerPartyId: string;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get accessRoleTypeId(): string {
    return this._accessRoleTypeId;
  }

  set accessRoleTypeId(value: string) {
    this._accessRoleTypeId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get ownerPartyId(): string {
    return this._ownerPartyId;
  }

  set ownerPartyId(value: string) {
    this._ownerPartyId = value;
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