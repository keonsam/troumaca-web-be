import {Field, ID} from "type-graphql";

export class ValidateConfirmCodeRequest {
  @Field(() => ID)
  credentialId: string;
  @Field()
  code: string;

  constructor(credentialId: string, code: string) {
    this.credentialId = credentialId;
    this.code = code;
  }
}