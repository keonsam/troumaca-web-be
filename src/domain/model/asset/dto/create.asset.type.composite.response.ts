import {Field, ObjectType} from "type-graphql";
import {CreateAssetTypeResponse} from "./create.asset.type.response";
import {CreateAssetTypeStructuresResponse} from "./create.asset.type.structures.response";

@ObjectType()
export class CreateAssetTypeCompositeResponse {
    @Field(() => CreateAssetTypeResponse, {nullable: false})
    assetTypeResponse: CreateAssetTypeResponse;
    @Field(() => CreateAssetTypeStructuresResponse, {nullable: false})
    assetTypeStructureResponse: CreateAssetTypeStructuresResponse
}
