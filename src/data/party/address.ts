import {Party} from "./party";

export class Address extends Party {
  siteId: string;
  streetNumber: string;
  streetName: string;
  postCode: string;
  stateOrProvince: string;
  city: string;
  country: string;
  description: string;
  type: string;
}
