import {Party} from "./party";
import { ContactInfo } from "./contact.info";
import { Address } from "./address";
import {Field, ID, ObjectType} from "type-graphql";


@ObjectType()
export class Organization extends Party {
  @Field( () => ID)
  partyId: any;
  @Field()
  name: string;
  @Field()
  purpose: string;
  status: string;
  contactInfo: ContactInfo;
  address: Address;
  imgUrl: string;
}
