export class Party {

  private _partyId: string;
  private _version: string;
  private _tenantPartyId: string;
  private _modifiedOn: Date;

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }

  get tenantPartyId(): string {
    return this._tenantPartyId;
  }

  set tenantPartyId(value: string) {
    this._tenantPartyId = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

}
