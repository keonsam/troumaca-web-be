import {VirtualSite} from "./virtual.site";

export class Phone extends VirtualSite {
  countryCode: string;
  areaCode: string;
  exchange: string;
  telephoneNumber: string;
  extension: string;
}
