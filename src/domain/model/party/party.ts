import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Party {
  @Field(() => ID, {nullable: true})
  partyId: string;
  @Field( {nullable: true})
  version: string;
  @Field( {nullable: true})
  ownerPartyId: string;
  @Field( {nullable: true})
  createdOn: Date;
  @Field( {nullable: true})
  modifiedOn: Date;

}
