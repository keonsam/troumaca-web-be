import {Field, ObjectType} from "type-graphql";
import {CreateAssetTypeResponse} from "./create.asset.type.response";

@ObjectType()
export class CreateAssetTypeStructuresResponse {
  @Field({nullable: false})
  assetTypeStructureId: string;
}