import { Field, InputType } from "type-graphql";

@InputType()
export class AssetTypeInput {
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
    attribute: string[];
}
