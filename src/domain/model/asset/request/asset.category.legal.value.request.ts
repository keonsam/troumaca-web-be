import {Field, InputType} from "type-graphql";

@InputType()
export class AssetCategoryLegalValueRequest {
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
}
