import { Field, InputType } from "type-graphql";
import { Credential } from "../../../data/authentication/credential";

@InputType()
export class RegisterInput implements Partial<Credential> {
    @Field()
    username: string;
    @Field()
    password: string;
    @Field({nullable: true})
    companyName: string;
}
