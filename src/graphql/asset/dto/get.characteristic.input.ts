import { Field, InputType } from "type-graphql";

@InputType()
export class GetCharacteristicInput {
    @Field({ nullable: true })
    search: string;
    @Field(() => [String], { nullable: true })
    selected: [string];
}
