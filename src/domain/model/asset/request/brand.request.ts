import {Field, ID, InputType} from "type-graphql";

@InputType()
export class BrandRequest {
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
}
