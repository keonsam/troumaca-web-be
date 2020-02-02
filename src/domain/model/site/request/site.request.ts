import {Field, InputType} from "type-graphql";

@InputType()
export class SiteRequest {
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;
}
