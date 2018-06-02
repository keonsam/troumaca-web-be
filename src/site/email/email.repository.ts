import {Observable} from "rxjs/Observable";
import {Email} from "./email";

export interface EmailRepository {
  saveEmail(email:Email):Observable<Email>;

  getEmails(pageNumber:number, pageSize:number, order:string):Observable<Email[]>;

  getEmailCount():Observable<number>;

  getEmailById(siteId:string):Observable<Email>;

  updateEmail(siteId:string, email:Email):Observable<number>;

  deleteEmail(siteId:string):Observable<number>;
}
