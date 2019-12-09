import {Party} from "./party";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Person extends Party {
  partyType: string;
  @Field( () => ID)
  partyId: string;
  @Field()
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;

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
