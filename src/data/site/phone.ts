import { VirtualSite } from "./virtual.site";

export class Phone extends VirtualSite {

  private _countryCode: string;
  private _areaCode: string;
  private _exchange: string;
  private _telephoneNumber: string;
  private _extension: string;

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  get areaCode(): string {
    return this._areaCode;
  }

  set areaCode(value: string) {
    this._areaCode = value;
  }

  get exchange(): string {
    return this._exchange;
  }

  set exchange(value: string) {
    this._exchange = value;
  }

  get telephoneNumber(): string {
    return this._telephoneNumber;
  }

  set telephoneNumber(value: string) {
    this._telephoneNumber = value;
  }

  get extension(): string {
    return this._extension;
  }

  set extension(value: string) {
    this._extension = value;
  }
}
