import {createSessionDataProvider} from "../../../infrastructure/session/session.data.provider.factory";
import {SessionDataProvider} from "../../../port/session.data.provider";
import { Observable, of } from "rxjs";
import {map} from "rxjs/operators";
import {ValidSession} from "../../../domain/model/session/valid.session";
import { HeaderBaseOptions } from "../../../header.base.options";

export class SessionOrchestrator {

  private sessionRepository: SessionDataProvider;

  constructor() {
    this.sessionRepository = createSessionDataProvider();
  }

  isValidSession(sessionId: string, options?: HeaderBaseOptions): Observable<ValidSession> {
    return this.sessionRepository.isValidSession(sessionId, options);
  }

  handleSessionLogOut(sessionId: string, options?: any): Observable<boolean> {
    return this.sessionRepository.expireSession(sessionId, options)
      .pipe(map(numReplaced => {
        if (numReplaced) {
          return true;
        } else {
          return false;
        }
      }));
  }
}
