import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CharacteristicType {
  @Field()
  assetCharacteristicTypeId: string;
  @Field()
  name: string;
  canonicalName: string;
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
  constructor(assetCharacteristicTypeId?: string, name?: string) {
    this.assetCharacteristicTypeId = assetCharacteristicTypeId;
    this.name = name;
  }
}
