import {Field, InputType} from "type-graphql";

@InputType()
export class AccessRoleInput {
    @Field()
    name: string;
}
