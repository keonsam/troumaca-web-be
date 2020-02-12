import {Field, InputType} from "type-graphql";

@InputType()
export class UpdateCompanyInput {
    @Field()
    name: string;
    @Field()
    purpose: string;
}
