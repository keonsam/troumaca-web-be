import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Confirmation {
  // @Field(() => ID)
  // confirmationId: string;
  // @Field(() => ID)
  // credentialId: string;
  // code: string;
  // @Field()
  // status: string;
  // @Field()
  // modifiedOn: Date;
  // @Field()
  // createdOn: Date;
  // @Field()
  // version: string;

  @Field(() => ID)
  confirmationId: string;
  @Field(() => ID)
  credentialId: string;
  code: string;
  @Field()
  confirmationType: string;
  @Field()
  dateModifiedLocal: Date;
  @Field()
  dateModifiedTimeZoneId:  string;
  @Field()
  dateModifiedUtc: Date;
  @Field()
  dateModifiedTimeZoneVersion: string;
  @Field()
  version: string;
}
