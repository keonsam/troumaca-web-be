import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class AuthenticatedCredential {
  @Field(type => ID)
  ownerPartyId: string;
  @Field(type => ID)
  credentialId: string;
  @Field()
  username: string;
  @Field()
  authenticateStatus: string;
  @Field(type => ID)
  confirmationId: string;
  @Field(type => ID)
  partyId: string;
  @Field(type => ID)
  sessionId: string;
}
