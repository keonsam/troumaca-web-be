import { ContactInfo } from "../contract/contact.info";
import { Address } from "../site/address";
import {Party} from "./party";

export class Organization extends Party {
  partyId: any;
  name: string;
  purpose: string;
  status: string;
  contactInfo: ContactInfo;
  address: Address;
  imgUrl: string;
}
