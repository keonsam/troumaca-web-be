import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class AssetCategoryLegalValue {
  @Field( () => ID)
  assetCategoryLegalValueId: string;
  @Field()
  name: string;
  @Field( {nullable: true})
  description: string;
  assetCharacteristicId: string;
  categoryValue: string;
  dateEffective: Date;
  dateUntil: Date;
  version: string;
  ownerPartyId: string;
  dateModified: Date;

  constructor(name?: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}
