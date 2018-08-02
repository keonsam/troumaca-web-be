import { ResourceType } from "../resource-type/resource.type";

export class Resource {

  private _resourceId: string;
  private _resourceTypeId: string;
  private _resourceType: ResourceType;
  private _name: string;
  private _description: string;
  // private _ownerPartyId:string;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get resourceId(): string {
    return this._resourceId;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  get resourceTypeId(): string {
    return this._resourceTypeId;
  }

  set resourceTypeId(value: string) {
    this._resourceTypeId = value;
  }

  get resourceType(): ResourceType {
    return this._resourceType;
  }

  set resourceType(value: ResourceType) {
    this._resourceType = value;
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
