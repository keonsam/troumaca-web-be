import {Field, InputType} from "type-graphql";

@InputType()
export class SiteInput {
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
}
