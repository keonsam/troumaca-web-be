import {Field, ID, ObjectType} from "type-graphql";
import {Party} from "../party";

@ObjectType()
export class Person extends Party {
  partyType: string;
  @Field( () => ID)
  partyId: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field( { nullable: true })
  email: string;
  @Field( { nullable: true })
  mobile: string;
  @Field( { nullable: true })
  imgUrl: string;
  middleName: string;
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
