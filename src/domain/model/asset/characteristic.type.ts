import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CharacteristicType {
  @Field()
  assetCharacteristicTypeId: string;
  @Field()
  name: string;
  @Field()
  deactivated: boolean;
  @Field( () => [String])
  icon: string[];
  canonicalName: string;
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
  constructor(characteristicTypeId?: string, name?: string, icon?: string[]) {
    this.assetCharacteristicTypeId = characteristicTypeId;
    this.name = name;
    this.icon = icon;
  }
}
