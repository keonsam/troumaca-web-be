import { Field, InputType } from "type-graphql";
import { Credential } from "../credential";

@InputType()
export class RegisterRequest implements Partial<Credential> {
    @Field({nullable: true})
    firstName: string;

    @Field({nullable: true})
    lastName: string;

    @Field({nullable: true})
    organizationName: string;

    @Field({nullable: true})
    username: string;

    @Field({nullable: true})
    password: string;
}
