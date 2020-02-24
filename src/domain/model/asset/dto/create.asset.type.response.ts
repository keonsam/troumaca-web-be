import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CreateAssetTypeResponse {
  @Field( {nullable: false})
  assetTypeId: string;
  @Field( {nullable: false})
  name: string;
  @Field( {nullable: false})
  canonicalName: string;
  @Field( {nullable: false})
  description: string;
  @Field( {nullable: false})
  modelNumber: string;
  @Field( {nullable: false})
  standardPrice: number;
  @Field( {nullable: false})
  dateEffectiveLocal: Date;
  @Field( {nullable: false})
  dateEffectiveTimeZoneId: string;
  @Field( {nullable: false})
  dateEffectiveUtc: Date;
  @Field( {nullable: false})
  dateEffectiveTimeZoneVersion: string;
  @Field( {nullable: false})
  version: string;
  @Field( {nullable: false})
  ownerPartyId: string;
}