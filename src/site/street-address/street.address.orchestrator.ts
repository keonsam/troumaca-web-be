import {createStreetAddressRepository} from './street.address.repository.factory';
import {StreetAddressRepository} from "./street.address.repository";
import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {shapeStreetAddressesResponse} from "./street.address.response.shaper";
import {StreetAddress} from "./street.address";
import {Result} from "../../result.success";

export class StreetAddressOrchestrator {

  private streetAddressRepository:StreetAddressRepository;

  constructor() {
    this.streetAddressRepository = createStreetAddressRepository();
  }

  saveStreetAddress(streetAddress:StreetAddress):Observable<StreetAddress> {
    return this.streetAddressRepository.saveStreetAddress(streetAddress);
  };

  getStreetAddresses(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.streetAddressRepository
      .getStreetAddresses(number, size, sort)
      .flatMap(value => {
        return this.streetAddressRepository
          .getStreetAddressCount()
          .map(count => {
            let shapeStreetAddressesResp:any = shapeStreetAddressesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "streetAddresses", shapeStreetAddressesResp);
          });
      });
  };

  getStreetAddressById(siteId:string):Observable<StreetAddress> {
    return this.streetAddressRepository.getStreetAddressById(siteId);
  };

  updateStreetAddress(siteId:string, streetAddress:StreetAddress):Observable<number> {
    return this.streetAddressRepository.updateStreetAddress(siteId, streetAddress);
  };

  deleteStreetAddress(siteId:string):Observable<number> {
    return this.streetAddressRepository.deleteStreetAddress(siteId);
  };


}
