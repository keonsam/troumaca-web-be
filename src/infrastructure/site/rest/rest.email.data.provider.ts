// import {SiteDataProvider} from "../../../port/site.data.provider";
// import {Site} from "../../../domain/model/site/site";
import {Observable} from "rxjs";
// import {HeaderBaseOptions} from "../../../header.base.options";
// import {Sites} from "../../../domain/model/site/sites";
import {EmailDataProvider} from "../../../port/email.data.provider";
import {Email} from "../../../domain/model/site/email";

export class RestEmailDataProvider implements EmailDataProvider {
  deleteEmail(siteId: string): Observable<number> {
    return undefined;
  }

  getEmailById(siteId: string): Observable<Email> {
    return undefined;
  }

  getEmailCount(): Observable<number> {
    return undefined;
  }

  getEmails(pageNumber: number, pageSize: number, order: string): Observable<Email[]> {
    return undefined;
  }

  saveEmail(email: Email): Observable<Email> {
    return undefined;
  }

  updateEmail(siteId: string, email: Email): Observable<number> {
    return undefined;
  }


}