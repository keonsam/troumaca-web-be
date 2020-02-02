import { Field, InputType } from "type-graphql";
import { Credential } from "../credential";

@InputType()
export class RegisterRequest implements Partial<Credential> {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({nullable: true})
    organizationName: string;

    @Field()
    username: string;

    @Field()
    password: string;
}
