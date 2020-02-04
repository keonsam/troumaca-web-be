import {Field, InputType} from "type-graphql";

@InputType()
export class UpdateMeInput {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field()
    mobile: string;
}
