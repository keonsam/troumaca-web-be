import {Party} from "./party";

export class Person extends Party {

  private _partyType: string;

  get partyType(): string {
    return this._partyType;
  }

  set partyType(value: string) {
    this._partyType = value;
  }

  private _firstName: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  private _middleName: string;

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  private _lastName: string;

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  private _dateOfBirth: Date;

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get partyId(): string {
    return super.partyId;
  }

  set partyId(value: string) {
    super.partyId = value;
  }

  get name(): string {
    return `${this.lastName}, ${this.firstName}`;
  }

  toJson() {
    return {
      partyId: this.partyId,
      version: this.version,
      tenantPartyId: this.tenantPartyId,
      modifiedOn: this.modifiedOn,
      partyType: this.partyType,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth
    };
  }

}
