import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class AssetType {
    @Field(() => ID, {nullable: true})
    assetTypeId: string;
    @Field({nullable: true})
    name: string;
    @Field({nullable: true})
    canonicalName: string;
    @Field({nullable: true})
    description: string;
    @Field({nullable: true})
    color: string;
    @Field({nullable: true})
    share: boolean;
    @Field({nullable: true})
    use: boolean;
    subTypeOfId: string;
    @Field({nullable: true})
    specification: boolean;
    @Field({nullable: true})
    version: string;
    @Field({nullable: true})
    ownerPartyId: string;
    @Field({nullable: true})
    dateModified: Date;
    @Field({nullable: true})
    dateModifiedLocal: Date;
    @Field({nullable: true})
    dateModifiedTimeZoneId: string;
    @Field({nullable: true})
    dateModifiedUtc: Date;
    @Field({nullable: true})
    dateModifiedTimeZoneVersion: string;
}
