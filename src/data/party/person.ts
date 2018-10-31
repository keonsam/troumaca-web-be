import {Party} from "./party";

export class Person extends Party {

  partyType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;

  get name(): string {
    return `${this.lastName}, ${this.firstName}`;
  }

  // toJson() {
  //   return {
  //     partyId: this.partyId,
  //     version: this.version,
  //     ownerPartyId: this.ownerPartyId,
  //     modifiedOn: this.modifiedOn,
  //     partyType: this.partyType,
  //     firstName: this.firstName,
  //     middleName: this.middleName,
  //     lastName: this.lastName,
  //     dateOfBirth: this.dateOfBirth
  //   };
  // }

}
