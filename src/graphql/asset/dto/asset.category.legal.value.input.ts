import {Field, InputType} from "type-graphql";

@InputType()
export class AssetCategoryLegalValueInput {
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
}
