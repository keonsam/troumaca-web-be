import {createPhoneDataProvider} from "../../../infrastructure/site/phone.data.provider.factory";
import {PhoneDataProvider} from "../../../port/phone.data.provider";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {shapePhonesResponse} from "./phone.response.shaper";
import {Phone} from "../../../domain/model/site/phone";
import {Result} from "../../../result.success";

export class PhoneOrchestrator {

  private phoneRepository: PhoneDataProvider;

  constructor() {
    this.phoneRepository = createPhoneDataProvider();
  }

  savePhone(phone: Phone): Observable<Phone> {
    return this.phoneRepository.savePhone(phone);
  }

  getPhones(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.phoneRepository
      .getPhones(number, size, sort)
      .pipe(flatMap(value => {
        return this.phoneRepository
          .getPhoneCount()
          .pipe(map(count => {
            const shapePhonesResp: any = shapePhonesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "phones", shapePhonesResp);
          }));
      }));
  }

  getPhoneById(siteId: string): Observable<Phone> {
    return this.phoneRepository.getPhoneById(siteId);
  }

  updatePhone(siteId: string, phone: Phone): Observable<number> {
    return this.phoneRepository.updatePhone(siteId, phone);
  }

  deletePhone(siteId: string): Observable<number> {
    return this.phoneRepository.deletePhone(siteId);
  }


}
