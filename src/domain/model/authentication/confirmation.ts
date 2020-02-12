import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Confirmation {

  @Field(() => ID)
  confirmationId: string;
  @Field(() => ID)
  credentialId: string;
  @Field({nullable: true})
  code: string;
  @Field({nullable: true})
  confirmationType: string;
  @Field({nullable: true})
  dateModifiedLocal: Date;
  @Field({nullable: true})
  dateModifiedTimeZoneId:  string;
  @Field({nullable: true})
  dateModifiedUtc: Date;
  @Field({nullable: true})
  dateModifiedTimeZoneVersion: string;
  @Field({nullable: true})
  version: string;

  // TODO: Deprecated
  @Field({nullable: true})
  status: string;
  @Field({nullable: true})
  modifiedOn: Date;
  @Field({nullable: true})
  createdOn: Date;
}
