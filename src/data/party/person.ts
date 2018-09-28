import { Party } from "./party";

export class Person extends Party {

  private _partyType: string;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _dateOfBirth: Date;

  get partyType(): string {
    return this._partyType;
  }

  set partyType(value: string) {
    this._partyType = value;
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

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

}
