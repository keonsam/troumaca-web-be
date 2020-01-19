import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Site {
    @Field( () => ID)
    siteId: string;
    @Field()
    name: string;
    @Field( {nullable: true})
    description: string;


    constructor(name?: string, description?: string) {
        this.name = name;
        this.description = description;
    }
}
