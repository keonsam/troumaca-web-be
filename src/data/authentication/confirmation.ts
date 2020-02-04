import {Field, ID, ObjectType} from "type-graphql";
import {Base} from "../base";

@ObjectType()
export class Confirmation extends Base {
  @Field(() => ID)
  confirmationId: string;
  @Field(() => ID)
  credentialId: string;
  code: string;
  @Field()
  status: string;
}
