import {Field, InputType} from "type-graphql";

@InputType()
export class PartOfAssetTypeStructureRequest {
  @Field({nullable:true})
  partOfAssetTypeId: string;
}