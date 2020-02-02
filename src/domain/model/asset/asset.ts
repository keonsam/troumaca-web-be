import { Field, ID, ObjectType } from "type-graphql";
import { AssetType } from "./asset.type";

@ObjectType()
export class Asset {
  @Field( () => ID)
  assetId: string;
  @Field( () => ID, {nullable: true})
  assetTypeId: string;
  @Field()
  name: string;
  @Field( {nullable: true})
  description: string;
  @Field( {nullable: true})
  image: string;
  @Field( () => AssetType, {nullable: true})
  assetType: AssetType;
  // not in query
  dateOfCreation: Date;
  dateOfDestruction: Date;
  @Field( {nullable: true})
  version: string;
  @Field( {nullable: true})
  ownerPartyId: string;
  dateModified: Date;
}
