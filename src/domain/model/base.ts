import {Field, Int} from "type-graphql";

export class Base {
    @Field( () => Int)
    modifiedOn: number;
    @Field( () => Int)
    createdOn: number;
    @Field()
    version: string;
}
