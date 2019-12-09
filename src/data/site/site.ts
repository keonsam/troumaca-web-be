import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Site {
    @Field( () => ID)
    siteId: string;
    @Field()
    name: string;
}
