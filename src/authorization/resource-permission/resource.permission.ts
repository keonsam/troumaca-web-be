export class ResourcePermission {

  private _resourcePermissionId: string;
  private _resourceId: string;
  private _permissionName: string;
  private _permissionId: string;
  private _description: string;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get resourcePermissionId(): string {
    return this._resourcePermissionId;
  }

  set resourcePermissionId(value: string) {
    this._resourcePermissionId = value;
  }

  get resourceId(): string {
    return this._resourceId;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  get permissionName(): string {
      return this._permissionName;
  }

  set permissionName(value: string) {
      this._permissionName = value;
  }

  get permissionId(): string {
      return this._permissionId;
  }

  set permissionId(value: string) {
      this._permissionId = value;
  }

  get description(): string {
      return this._description;
  }

  set description(value: string) {
      this._description = value;
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
