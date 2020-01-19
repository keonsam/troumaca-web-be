import {Field, ID, InputType} from "type-graphql";

@InputType()
export class BrandInput {
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
}
