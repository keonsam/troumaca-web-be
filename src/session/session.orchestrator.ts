import {createSessionRepositoryFactory} from "./session.repository.factory";
import {SessionRepository} from "./session.repository";
import {Observable} from "rxjs/Observable";
import {Session} from "./session";

export class SessionOrchestrator {

  private sessionRepository:SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
  }

  isValidSession(sessionId:string):Observable<boolean> {
    // return Observable.of(true);
    return this.sessionRepository.isValidSession(sessionId);
  }

  getSimpleSession(sessionId:string): Observable<Session> {
    // Todo: Need to verify.
    if(!sessionId) {
      return Observable.of(new Session());
    }
    return this.sessionRepository.getSessionById(sessionId);
  }

  handleSessionLogOut(sessionId: string): Observable<boolean> {
    return this.sessionRepository.expireSession(sessionId)
      .map( numReplaced => {
        if(numReplaced) {
          return true;
        }else {
          return false;
        }
      });
  }


}
