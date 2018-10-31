import {VirtualSite} from "./virtual.site";

export class Phone extends VirtualSite {

  private _countryCode: string;

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  private _areaCode: string;

  get areaCode(): string {
    return this._areaCode;
  }

  set areaCode(value: string) {
    this._areaCode = value;
  }

  private _exchange: string;

  get exchange(): string {
    return this._exchange;
  }

  set exchange(value: string) {
    this._exchange = value;
  }

  private _telephoneNumber: string;

  get telephoneNumber(): string {
    return this._telephoneNumber;
  }

  set telephoneNumber(value: string) {
    this._telephoneNumber = value;
  }

  private _extension: string;

  get extension(): string {
    return this._extension;
  }

  set extension(value: string) {
    this._extension = value;
  }
}
