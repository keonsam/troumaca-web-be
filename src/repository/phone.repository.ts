import {Phone} from "../data/site/phone";
import {Observable} from "rxjs";

export interface PhoneRepository {
  savePhone(phone: Phone): Observable<Phone>;

  getPhones(pageNumber: number, pageSize: number, order: string): Observable<Phone[]>;

  getPhoneCount(): Observable<number>;

  getPhoneById(siteId: string): Observable<Phone>;

  updatePhone(siteId: string, phone: Phone): Observable<number>;

  deletePhone(siteId: string): Observable<number>;
}
