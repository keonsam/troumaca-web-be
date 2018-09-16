import { createSessionRepositoryFactory } from "../adapter/session/session.repository.factory";
import { SessionRepository } from "../repository/session.repository";
import { Session } from "../data/session/session";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class SessionOrchestrator {

  private sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
  }

  isValidSession(sessionId: string, options?: any): Observable<boolean> {
    // return Observable.of(true);
    return this.sessionRepository.isValidSession(sessionId, options);
  }

  getSession(sessionId: string, options?: any): Observable<Session> {
    return this.sessionRepository.getSessionById(sessionId, options);
  }

  handleSessionLogOut(sessionId: string, options?: any): Observable<boolean> {
    return this.sessionRepository.expireSession(sessionId, options)
      .pipe(map( numReplaced => {
        if (numReplaced) {
          return true;
        } else {
          return false;
        }
      }));
  }


}
