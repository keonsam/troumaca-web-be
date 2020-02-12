import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class ChangeResponse {
    @Field({nullable: true})
    name: string;
    @Field({nullable: true})
    changed: boolean;
}