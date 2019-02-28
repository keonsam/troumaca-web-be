import {Party} from "./party";
import { ContactInfo } from "./contact.info";
import { Address } from "./address";

export class Organization extends Party {
  partyId: any;
  name: string;
  purpose: string;
  status: string;
  contactInfo: ContactInfo;
  address: Address;
  imgUrl: string;
}
