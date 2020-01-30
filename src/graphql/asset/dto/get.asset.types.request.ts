import { Field, InputType } from "type-graphql";

@InputType()
export class GetAssetTypesRequest {
    @Field()
    tab: string;
    @Field()
    type: string;
    @Field({ nullable: true })
    search: string;
}
