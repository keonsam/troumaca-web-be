import {Field, InputType} from "type-graphql";

@InputType()
export class AssetRoleTypeInput {
    @Field()
    name: string;
    @Field({nullable: true})
    description: string;
}
