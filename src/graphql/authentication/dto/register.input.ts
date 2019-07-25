import { Field, InputType } from "type-graphql";
import { Credential } from "../../../data/authentication/credential";

@InputType()
export class RegisterInput implements Partial<Credential> {
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
