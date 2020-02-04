import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class PartyCredential {
  @Field( () => ID, {nullable: true})
  partyCredentialId: string;
  @Field( () => ID, {nullable: true})
  partyId: string;
  @Field( () => ID, {nullable: true})
  credentialId: string;
  @Field( {nullable: true})
  version: string;
  @Field( {nullable: true})
  ownerPartyId: string;
  @Field( {nullable: true})
  dateModifiedLocal: Date;
  @Field( {nullable: true})
  dateModifiedTimeZoneId: string;
  @Field( {nullable: true})
  dateModifiedUtc: Date;
  @Field( {nullable: true})
  dateModifiedTimeZoneVersion: string;
}