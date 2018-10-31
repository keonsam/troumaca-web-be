import {createStreetAddressRepository} from "../../adapter/site/street.address.repository.factory";
import {StreetAddressRepository} from "../../repository/street.address.repository";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {shapeStreetAddressesResponse} from "./street.address.response.shaper";
import {StreetAddress} from "../../data/site/street.address";
import {Result} from "../../result.success";

export class StreetAddressOrchestrator {

  private streetAddressRepository: StreetAddressRepository;

  constructor() {
    this.streetAddressRepository = createStreetAddressRepository();
  }

  getStreetAddresses(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.streetAddressRepository
      .getStreetAddresses(number, size, sort)
      .pipe(flatMap(value => {
        return this.streetAddressRepository
          .getStreetAddressCount()
          .pipe(map(count => {
            const shapeStreetAddressesResp: any = shapeStreetAddressesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "streetAddresses", shapeStreetAddressesResp);
          }));
      }));
  }

  getStreetAddressById(siteId: string): Observable<StreetAddress> {
    return this.streetAddressRepository.getStreetAddressById(siteId);
  }

  saveStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress> {
    return this.streetAddressRepository.saveStreetAddress(streetAddress);
  }

  updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number> {
    return this.streetAddressRepository.updateStreetAddress(siteId, streetAddress);
  }

  deleteStreetAddress(siteId: string): Observable<number> {
    return this.streetAddressRepository.deleteStreetAddress(siteId);
  }


}
