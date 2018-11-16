import {Site} from "./site";

export class PhysicalSite extends Site {
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  createdOn: Date;
  modifiedOn: Date;
}
