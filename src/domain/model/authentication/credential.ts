import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Credential {

  @Field(() => ID, {nullable: true})
  credentialId: string;
  @Field({nullable: true})
  username: string;
  @Field({nullable: true})
  password: string;
  @Field({nullable: true})
  version: String;
  @Field({nullable: true})
  dateModifiedLocal: Date;
  @Field({nullable: true})
  dateModifiedTimeZoneId: String;
  @Field({nullable: true})
  dateModifiedUtc: Date;
  @Field({nullable: true})
  dateModifiedTimeZoneVersion: String;

  // TODO: Remove deprecated
  @Field(() => ID)
  partyId: string;
  @Field({nullable: true})
  companyName: string;
  @Field({nullable: true})
  status: string;
  @Field({nullable: true})
  modifiedOn: Date;
  @Field({nullable: true})
  createdOn: Date;

  constructor(username: string, companyName: string, password: string) {
    this.username = username;
    this.companyName = companyName;
    this.password = password;
  }
}
