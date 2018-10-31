import {Site} from "./site";

export class VirtualSite extends Site {

  private _createdOn: Date;

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  private _removedOn: Date;

  get removedOn(): Date {
    return this._removedOn;
  }

  set removedOn(value: Date) {
    this._removedOn = value;
  }

}
