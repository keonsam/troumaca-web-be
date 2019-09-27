import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class AssetType {
    @Field(() => ID)
    assetTypeId: string;
    @Field()
    name: string;
    @Field({nullable: true})
    description: string;
    @Field()
    color: string;
    @Field({nullable: true})
    share: boolean;
    @Field({nullable: true})
    use: boolean;
    subTypeOfId: string;
    specification: boolean;
    version: string;
    ownerPartyId: string;
    dateModified: Date;
}
