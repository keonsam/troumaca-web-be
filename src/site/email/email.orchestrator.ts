import {createEmailRepository} from "../../adapter/site/email.repository.factory";
import {EmailRepository} from "../../repository/email.repository";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {shapeEmailsResponse} from "./email.response.shaper";
import {Email} from "../../data/site/email";
import {Result} from "../../result.success";

export class EmailOrchestrator {

  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = createEmailRepository();
  }

  saveEmail(email: Email): Observable<Email> {
    return this.emailRepository.saveEmail(email);
  }

  getEmails(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.emailRepository
      .getEmails(number, size, sort)
      .pipe(flatMap(value => {
        return this.emailRepository
          .getEmailCount()
          .pipe(map(count => {
            const shapeEmailsResp: any = shapeEmailsResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "emails", shapeEmailsResp);
          }));
      }));
  }

  getEmailById(siteId: string): Observable<Email> {
    return this.emailRepository.getEmailById(siteId);
  }

  updateEmail(siteId: string, email: Email): Observable<number> {
    return this.emailRepository.updateEmail(siteId, email);
  }

  deleteEmail(siteId: string): Observable<number> {
    return this.emailRepository.deleteEmail(siteId);
  }


}
