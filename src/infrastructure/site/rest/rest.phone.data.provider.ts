import {Observable} from "rxjs";
import {PhoneDataProvider} from "../../../port/phone.data.provider";
import {Phone} from "../../../domain/model/site/phone";

export class RestPhoneDataProvider implements PhoneDataProvider {
  deletePhone(siteId: string): Observable<number> {
    return undefined;
  }

  getPhoneById(siteId: string): Observable<Phone> {
    return undefined;
  }

  getPhoneCount(): Observable<number> {
    return undefined;
  }

  getPhones(pageNumber: number, pageSize: number, order: string): Observable<Phone[]> {
    return undefined;
  }

  savePhone(phone: Phone): Observable<Phone> {
    return undefined;
  }

  updatePhone(siteId: string, phone: Phone): Observable<number> {
    return undefined;
  }

}