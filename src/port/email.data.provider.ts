import {Email} from "../domain/model/site/email";
import {Observable} from "rxjs";

export interface EmailDataProvider {
  saveEmail(email: Email): Observable<Email>;

  getEmails(pageNumber: number, pageSize: number, order: string): Observable<Email[]>;

  getEmailCount(): Observable<number>;

  getEmailById(siteId: string): Observable<Email>;

  updateEmail(siteId: string, email: Email): Observable<number>;

  deleteEmail(siteId: string): Observable<number>;
}
