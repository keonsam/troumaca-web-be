import {Field, ID, ObjectType} from "type-graphql";
import {Party} from "../party";

@ObjectType()
export class Person extends Party {
  @Field({nullable: true})
  partyType: string;
  @Field( () => ID)
  partyId: string;
  @Field({nullable: true})
  firstName: string;
  @Field({nullable: true})
  middleName: string;
  @Field({nullable: true})
  lastName: string;
  @Field({nullable: true})
  dateOfBirth: Date;
  @Field({nullable: true})
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
