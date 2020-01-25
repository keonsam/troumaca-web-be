import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class AssetRoleType {

  constructor(name?: string, description?: string) {
    this.name = name;
    this.description = description;
  }

  @Field(() => ID)
  assetRoleTypeId: string;
  @Field()
  name: string;
  canonicalName: string;
  @Field({nullable: true})
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
