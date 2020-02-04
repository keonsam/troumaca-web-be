import {Observable} from "rxjs";
import {StreetAddressDataProvider} from "../../../port/street.address.data.provider";
import {StreetAddress} from "../../../domain/model/site/street.address";

export class RestStreetAddressDataProvider implements StreetAddressDataProvider {
  deleteStreetAddress(siteId: string): Observable<number> {
    return undefined;
  }

  getStreetAddressById(siteId: string): Observable<StreetAddress> {
    return undefined;
  }

  getStreetAddressCount(): Observable<number> {
    return undefined;
  }

  getStreetAddresses(pageNumber: number, pageSize: number, order: string): Observable<StreetAddress[]> {
    return undefined;
  }

  saveStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress> {
    return undefined;
  }

  updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number> {
    return undefined;
  }

}