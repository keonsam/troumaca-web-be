import {createSessionRepositoryFactory} from "../adapter/session/session.repository.factory";
import {SessionRepository} from "../repository/session.repository";
import { Observable, of } from "rxjs";
import {map} from "rxjs/operators";
import {ValidSession} from "../data/session/valid.session";
import { HeaderBaseOptions } from "../header.base.options";

export class SessionOrchestrator {

  private sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
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
