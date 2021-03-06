import { Field, ID, ObjectType } from "type-graphql";
import {Confirmation} from "../confirmation";
import {Credential} from "../credential";

@ObjectType()
export class RegisterResponse {
  @Field({nullable: true})
  confirmation: Confirmation;
  @Field({nullable: true})
  credential: Credential
}