import { Field, InputType } from "type-graphql";

@InputType()
export class GetCharacteristicsRequest {
    @Field({ nullable: true })
    tab: string;
    @Field({ nullable: true })
    search: string;
    @Field(() => [String], { nullable: true })
    selected: string[];
}
