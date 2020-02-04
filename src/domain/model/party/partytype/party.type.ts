import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class PartyType {
  @Field(() => ID, {nullable: true})
  partyTypeId: string;
  @Field({nullable: true})
  name: string;
  @Field({nullable: true})
  canonicalName: string;
  @Field({nullable: true})
  description: string;
  @Field({nullable: true})
  version: string;
  @Field({nullable: true})
  ownerPartyId: string;
  @Field({nullable: true})
  dateModifiedLocal: Date;
  @Field({nullable: true})
  dateModifiedTimeZoneId: string;
  @Field({nullable: true})
  dateModifiedUtc: Date;
  @Field({nullable: true})
  dateModifiedTimeZoneVersion: string;
}