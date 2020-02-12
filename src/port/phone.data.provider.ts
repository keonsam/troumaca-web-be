import {Phone} from "../domain/model/site/phone";
import {Observable} from "rxjs";

export interface PhoneDataProvider {
  savePhone(phone: Phone): Observable<Phone>;

  getPhones(pageNumber: number, pageSize: number, order: string): Observable<Phone[]>;

  getPhoneCount(): Observable<number>;

  getPhoneById(siteId: string): Observable<Phone>;

  updatePhone(siteId: string, phone: Phone): Observable<number>;

  deletePhone(siteId: string): Observable<number>;
}
