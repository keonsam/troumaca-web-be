import { createSessionRepositoryFactory } from "./session.repository.factory";
import { SessionRepository } from "./session.repository";
import { Observable } from "rxjs/Observable";
import { Session } from "./session";

export class SessionOrchestrator {

  private sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
  }

  isValidSession(sessionId: string, options?: any): Observable<boolean> {
      return Observable.of(true);
    // return this.sessionRepository.isValidSession(sessionId, options);
  }

  getSession(sessionId: string, options?: any): Observable<Session> {
    return this.sessionRepository.getSessionById(sessionId, options);
  }

  handleSessionLogOut(sessionId: string, options?: any): Observable<boolean> {
    return this.sessionRepository.expireSession(sessionId, options)
      .map( numReplaced => {
        if (numReplaced) {
          return true;
        } else {
          return false;
        }
      });
  }


}
