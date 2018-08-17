import { PhysicalSite } from "../physical.site";

export class StreetAddress extends PhysicalSite {

  private _suiteOrApartment: string;
  private _floor: string;
  private _suiteOrApartmentNumber: string;
  private _streetNumber: string;
  private _street: string;


  get suiteOrApartment(): string {
    return this._suiteOrApartment;
  }

  set suiteOrApartment(value: string) {
    this._suiteOrApartment = value;
  }

  get floor(): string {
    return this._floor;
  }

  set floor(value: string) {
    this._floor = value;
  }

  get suiteOrApartmentNumber(): string {
    return this._suiteOrApartmentNumber;
  }

  set suiteOrApartmentNumber(value: string) {
    this._suiteOrApartmentNumber = value;
  }

  get streetNumber(): string {
    return this._streetNumber;
  }

  set streetNumber(value: string) {
    this._streetNumber = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }


}
