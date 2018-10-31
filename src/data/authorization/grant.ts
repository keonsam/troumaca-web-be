export class Grant {

  private _grantId: string;

  get grantId(): string {
    return this._grantId;
  }

  set grantId(value: string) {
    this._grantId = value;
  }

  private _resourcePermissionId: string;

  get resourcePermissionId(): string {
    return this._resourcePermissionId;
  }

  set resourcePermissionId(value: string) {
    this._resourcePermissionId = value;
  }

  private _resourceId: string;

  get resourceId(): string {
    return this._resourceId;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  private _permissionId: string;

  get permissionId(): string {
    return this._permissionId;
  }

  set permissionId(value: string) {
    this._permissionId = value;
  }

  private _accessRoleId: string;

  get accessRoleId(): string {
    return this._accessRoleId;
  }

  set accessRoleId(value: string) {
    this._accessRoleId = value;
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
