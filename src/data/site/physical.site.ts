import { Site } from "./site";

export class PhysicalSite extends Site {

  private _city: string;
  private _stateOrProvince: string;
  private _postalCode: string;
  private _country: string;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get stateOrProvince(): string {
    return this._stateOrProvince;
  }

  set stateOrProvince(value: string) {
    this._stateOrProvince = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
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
