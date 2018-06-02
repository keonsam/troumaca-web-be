import {VirtualSite} from "../virtual.site";

export class Email extends VirtualSite {

  private _domainName:string;
  private _emailAddress:string;

  get domainName(): string {
    return this._domainName;
  }

  set domainName(value: string) {
    this._domainName = value;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

}
