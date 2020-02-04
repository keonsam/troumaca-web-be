import {Party} from "../party/party";
import {Field, ID} from "type-graphql";

export class ContactInfo {
  @Field(() => ID, {nullable: true})
  contactInfoId: string;
  @Field({nullable: true})
  email: string;
  @Field({nullable: true})
  phone: string;
  @Field({nullable: true})
  type: string;
}
