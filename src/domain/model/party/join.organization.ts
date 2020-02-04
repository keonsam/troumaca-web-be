import {Party} from "./party";

export class JoinOrganization extends Party {
  private _accessRequestId: string;

  get accessRequestId(): string {
    return this._accessRequestId;
  }

  set accessRequestId(value: string) {
    this._accessRequestId = value;
  }

  private _organizationId: string;

  get organizationId(): string {
    return this._organizationId;
  }

  set organizationId(value: string) {
    this._organizationId = value;
  }
}
