import {Site} from "./site";

export class PhysicalSite extends Site {

  private _city: string;

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  private _stateOrProvince: string;

  get stateOrProvince(): string {
    return this._stateOrProvince;
  }

  set stateOrProvince(value: string) {
    this._stateOrProvince = value;
  }

  private _postalCode: string;

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  private _country: string;

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
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
