import { Field, InputType } from "type-graphql";

@InputType()
export class GetAssetTypes {
    @Field({ nullable: true })
    search: string;
    // @Field(() => [String], { nullable: true })
    // selected: string[];
}
