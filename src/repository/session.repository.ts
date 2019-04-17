import {Session} from "../data/session/session";
import {Observable} from "rxjs";
import {ValidSession} from "../data/session/valid.session";
import { HeaderBaseOptions } from "../header.base.options";

export interface SessionRepository {

  isValidSession(sessionId: string, options?: HeaderBaseOptions): Observable<ValidSession>;

  getSessionById(sessionId: string, options?: any): Observable<Session>;

  expireSession(sessionId: string, options?: any): Observable<number>;

  // USED BY OTHER REPO

  addSession(session: Session, options?: any): Observable<Session>;

}
