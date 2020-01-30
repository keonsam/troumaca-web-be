import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AssetRequest {
    @Field( () => ID, {nullable: true})
    assetTypeId: string;
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
    @Field( {nullable: true})
    image: string;
}
