import { Observable } from "rxjs/Observable";
import { StreetAddress } from "../data/site/street.address";

export interface StreetAddressRepository {
  saveStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress>;

  getStreetAddresses(pageNumber: number, pageSize: number, order: string): Observable<StreetAddress[]>;

  getStreetAddressCount(): Observable<number>;

  getStreetAddressById(siteId: string): Observable<StreetAddress>;

  updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number>;

  deleteStreetAddress(siteId: string): Observable<number>;
}
