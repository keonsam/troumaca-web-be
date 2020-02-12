import {Field, InputType} from "type-graphql";

@InputType()
export class AssetRoleTypeRequest {
    @Field()
    name: string;
    @Field({nullable: true})
    description: string;
}
