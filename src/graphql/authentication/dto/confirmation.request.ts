import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ConfirmationRequest {
    @Field(() => ID)
    confirmationId: string;
    @Field(() => ID)
    credentialId: string;
    @Field()
    code: string;
}
