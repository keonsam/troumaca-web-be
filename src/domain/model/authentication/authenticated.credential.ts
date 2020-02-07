import { Field, ObjectType } from "type-graphql";
import { Confirmation } from "./confirmation";

@ObjectType()
export class AuthenticatedCredential {
  @Field()
  state: string;
  @Field()
  sessionId: string;
  @Field( () => Confirmation, {nullable: true})
  confirmation: Confirmation;
}
