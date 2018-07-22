export class AuthenticatedCredential {

  private _authenticated: boolean;
  private _credentialId: string;
  private _username: string;
  private _authenticateStatus: string;
  private _confirmationId: string;
  private _partyId: string;

  constructor(credentialId?: string) {
    this._credentialId = credentialId;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
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

}