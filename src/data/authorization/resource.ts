import {ResourceType} from "./resource.type";
import {ResourcePermission} from "./resource.permission";

export class Resource {

  private _resourceId: string;

  get resourceId(): string {
    return this._resourceId;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  private _resourceTypeId: string;

  get resourceTypeId(): string {
    return this._resourceTypeId;
  }

  set resourceTypeId(value: string) {
    this._resourceTypeId = value;
  }

  private _resourceTypeName: string;

  get resourceTypeName(): string {
    return this._resourceTypeName;
  }

  set resourceTypeName(value: string) {
    this._resourceTypeName = value;
  }

  private _resourcePermissions: ResourcePermission[];

  get resourcePermissions(): ResourcePermission[] {
    return this._resourcePermissions;
  }

  set resourcePermissions(value: ResourcePermission[]) {
    this._resourcePermissions = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

  // get ownerPartyId(): string {
  //   return this._ownerPartyId;
  // }
  //
  // set ownerPartyId(value: string) {
  //   this._ownerPartyId = value;
  // }

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
