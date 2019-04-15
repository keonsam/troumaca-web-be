import {Party} from "./party";

export class Person extends Party {
  partyType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  partyId: string;
  ownerPartyId: string;

  get name(): string {
    return `${this.lastName}, ${this.firstName}`;
  }

  constructor(firstName?: string, lastName?: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
