import { Field, InputType } from "type-graphql";

@InputType()
export class GetAssetTypesRequest {
    @Field({ nullable: true })
    tab: string;
    @Field({ nullable: true })
    type: string;
    @Field({ nullable: true })
    search: string;
}
