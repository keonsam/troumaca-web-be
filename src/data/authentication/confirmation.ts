import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Confirmation {
  @Field(type => ID)
  confirmationId: string;
  @Field(type => ID)
  credentialId: string;
  @Field()
  code: string;
  @Field()
  status: string;
  @Field()
  modifiedOn: Date;
  @Field()
  createdOn: Date;
  @Field()
  version: string;
}
