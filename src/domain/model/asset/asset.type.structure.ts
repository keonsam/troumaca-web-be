import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class AssetTypeStructure {
    @Field( () => ID,{nullable: true})
    assetTypeStructureId: string;
    @Field( {nullable: true})
    forAssetTypeId: string;
    @Field( {nullable: true})
    toAssetTypeId: string;
    @Field( {nullable: true})
    dateEffective: Date;
    @Field( {nullable: true})
    dateUntil: Date;
    @Field( {nullable: true})
    version: string;
    @Field( {nullable: true})
    ownerPartyId: string;
    @Field( {nullable: true})
    dateModified: Date;
}
