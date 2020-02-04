import { ContactInfo } from "../../contract/contact.info";
import { Address } from "../../site/address";
import {Party} from "../party";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Organization extends Party {
  @Field(() => ID, {nullable: true})
  partyId: string;
  @Field( {nullable: true})
  name: string;
  @Field( {nullable: true})
  purpose: string;
  @Field( {nullable: true})
  status: string;
  @Field( {nullable: true})
  contactInfo: ContactInfo;
  @Field( {nullable: true})
  address: Address;
  @Field( {nullable: true})
  imgUrl: string;
}
