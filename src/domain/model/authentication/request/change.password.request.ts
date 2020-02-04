import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ChangePasswordRequest {
  @Field(() => ID, {nullable: true})
  confirmationId: string;
  @Field(() => ID, {nullable: true})
  credentialId: string;
  @Field({nullable: true})
  oldPassword: string;
  @Field({nullable: true})
  newPassword: string;
  @Field({nullable: true})
  code: string;
}
