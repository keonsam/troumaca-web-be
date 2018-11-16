import {PhysicalSite} from "./physical.site";

export class StreetAddress extends PhysicalSite {
  suiteOrApartment: string;
  floor: string;
  suiteOrApartmentNumber: string;
  streetNumber: string;
  street: string;
}
