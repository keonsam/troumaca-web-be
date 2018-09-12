import { Permission } from "./permission";

export class ResourcePermission {

  private _resourcePermissionId: string;
  private _resourceId: string;
  private _permission: Permission;
  // private _ownerPartyId:string;
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

  get permission(): Permission {
    return this._permission;
  }

  set permission(value: Permission) {
    this._permission = value;
  }

// get ownerPartyId(): string {
  //   return this._ownerPartyId;
  // }
  //
  // set ownerPartyId(value: string) {
  //   this._ownerPartyId = value;
  // }

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
