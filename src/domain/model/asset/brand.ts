import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Brand {
  @Field( () => ID)
  brandId: string;
  @Field()
  name: string;
  ownerPartyId: string;
  abbreviation: string;
  @Field( {nullable: true})
  description: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
