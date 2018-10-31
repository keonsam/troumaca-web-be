import {Permission} from "./permission";

export class ResourcePermission {

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

  private _permissionName: string;

  get permissionName(): string {
    return this._permissionName;
  }

  set permissionName(value: string) {
    this._permissionName = value;
  }

  private _permissionId: string;

  get permissionId(): string {
    return this._permissionId;
  }

  set permissionId(value: string) {
    this._permissionId = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
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
