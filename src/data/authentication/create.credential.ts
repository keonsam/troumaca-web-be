export class CreateCredential {

  private _partyId: string;

  private _credentialId: string;

  private _firstName: string;

  private _lastName: string;

  private _username: string;

  private _password: string;

  private _status: string;

  private _modifiedOn: Date;

  private _createdOn: Date;

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

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  toJson() {
    return {
      partyId: this.partyId,
      credentialId: this.credentialId,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      status: this.status,
      modifiedOn: this.modifiedOn,
      createdOn: this.createdOn
    };
  }
}