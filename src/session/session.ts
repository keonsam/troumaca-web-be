export class Session {

  private _sessionId: string;
  private _partyId: string;
  private _credentialId: string;
  private _customerId: string;
  private _expirationTime: Date;
  private _createdOn: Date;
  private _modifiedOn: Date;
  private _data: Map<String, Object>;


  constructor(sessionId?: string, credentialId?: string, customerId?: string, expirationTime?: Date, createdOn?: Date, modifiedOn?: Date, data?: Map<String, Object>) {
    this._sessionId = sessionId;
    this._credentialId = credentialId;
    this._customerId = customerId;
    this._expirationTime = expirationTime;
    this._createdOn = createdOn;
    this._modifiedOn = modifiedOn;
    if (data) {
      this._data = data;
    } else {
      this.data = new Map<String, Object>();
    }
  }

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get credentialId(): string {
    return this._credentialId;
  }

  set credentialId(value: string) {
    this._credentialId = value;
  }

  get customerId(): string {
    return this._customerId;
  }

  set customerId(value: string) {
    this._customerId = value;
  }

  get expirationTime(): Date {
    return this._expirationTime;
  }

  set expirationTime(value: Date) {
    this._expirationTime = value;
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

  get data(): Map<String, Object> {
    return this._data;
  }

  set data(value: Map<String, Object>) {
    this._data = value;
  }

  toJson() {
    return {
      sessionId: this.sessionId,
      partyId: this.partyId,
      credentialId: this.credentialId,
      customerId: this.customerId,
      expirationTime: this.expirationTime,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn,
      data: this.data.values()
    };
  }

}
