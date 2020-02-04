import {Field, ObjectType} from "type-graphql";
import {Party} from "../party";

@ObjectType()
export class Credential extends Party {
  @Field()
  credentialId: string;
  @Field()
  username: string;
  @Field()
  companyName: string;
  @Field()
  password: string;
  status: string;


  constructor(username?: string, companyName?: string, password?: string) {
    super();
    this.username = username;
    this.companyName = companyName;
    this.password = password;
  }
}
