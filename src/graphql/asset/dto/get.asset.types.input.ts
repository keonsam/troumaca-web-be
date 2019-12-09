import { Field, InputType } from "type-graphql";

@InputType()
export class GetAssetTypesInput {
    @Field({ nullable: true })
    tab: string;
    @Field({ nullable: true })
    search: string;
}
