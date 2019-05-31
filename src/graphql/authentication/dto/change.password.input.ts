import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInput {
  @Field(type => ID)
  credentialId: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  code: string;
}
