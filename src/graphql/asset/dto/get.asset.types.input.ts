import { Field, InputType } from "type-graphql";

@InputType()
export class GetAssetTypesInput {
    @Field()
    tab: string;
    @Field()
    type: string;
    @Field({ nullable: true })
    search: string;
}
