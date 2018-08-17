export class AuthenticateResponse {

  private _authenticated: boolean;
  private _authenticatedStatus: string;
  private _confirmationId: string;
  private _credentialId: string;
  private _username: string;
  private _sessionId: string;
  private _partyId: string;

  constructor(authenticated?: boolean, authenticatedStatus?: string, confirmationId?: string,
              username?: string, credentialId?: string, sessionId?: string, partyId?: string) {
    this._authenticated = authenticated;
    this._authenticatedStatus = authenticatedStatus;
    this._confirmationId = confirmationId;
    this._credentialId = credentialId;
    this._username = username;
    this._sessionId = sessionId;
    this._partyId = partyId;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
  }

  get authenticatedStatus(): string {
    return this._authenticatedStatus;
  }

  set authenticatedStatus(value: string) {
    this._authenticatedStatus = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
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

  toJson() {
    return {
      authenticated: this.authenticated,
      authenticatedStatus: this.authenticatedStatus,
      confirmationId: this.confirmationId,
      username: this.username,
      credentialId: this.credentialId,
      sessionId: this.sessionId
    };
  }

}

