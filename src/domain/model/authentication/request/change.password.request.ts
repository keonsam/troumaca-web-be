import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ChangePasswordRequest {
  @Field(() => ID)
  confirmationId: string;
  @Field(() => ID)
  credentialId: string;
  @Field()
  oldPassword: string;
  @Field()
  newPassword: string;
  @Field()
  code: string;
}
