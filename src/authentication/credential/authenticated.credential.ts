export class AuthenticatedCredential {

  private _credentialId: string;
  private _username: string;
  private _authenticateStatus: string;
  private _confirmationId: string;
  private _partyId: string;
  private _sessionId: string;

  constructor(credentialId?: string) {
    this._credentialId = credentialId;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get authenticateStatus(): string {
    return this._authenticateStatus;
  }

  set authenticateStatus(value: string) {
    this._authenticateStatus = value;
  }

  get credentialId(): string {
    return this._credentialId;
  }

  set credentialId(value: string) {
    this._credentialId = value;
  }

  get confirmationId(): string {
    return this._confirmationId;
  }

  set confirmationId(value: string) {
    this._confirmationId = value;
  }

  get partyId(): string {
    return this._partyId;
  }

  set partyId(value: string) {
    this._partyId = value;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  toJson() {
    return {
        "authenticateStatus": this.authenticateStatus,
        "username": this.username,
        "credentialId": this.credentialId,
        "confirmationId": this.confirmationId,
        "partyId": this.partyId,
        "sessionId": this.sessionId
    };
  }
}