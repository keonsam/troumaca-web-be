import {PhysicalSite} from "./physical.site";

export class StreetAddress extends PhysicalSite {

  private _suiteOrApartment: string;

  get suiteOrApartment(): string {
    return this._suiteOrApartment;
  }

  set suiteOrApartment(value: string) {
    this._suiteOrApartment = value;
  }

  private _floor: string;

  get floor(): string {
    return this._floor;
  }

  set floor(value: string) {
    this._floor = value;
  }

  private _suiteOrApartmentNumber: string;

  get suiteOrApartmentNumber(): string {
    return this._suiteOrApartmentNumber;
  }

  set suiteOrApartmentNumber(value: string) {
    this._suiteOrApartmentNumber = value;
  }

  private _streetNumber: string;

  get streetNumber(): string {
    return this._streetNumber;
  }

  set streetNumber(value: string) {
    this._streetNumber = value;
  }

  private _street: string;

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }


}
