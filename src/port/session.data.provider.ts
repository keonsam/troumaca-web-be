import {Session} from "../domain/model/session/session";
import {Observable} from "rxjs";
import {ValidSession} from "../domain/model/session/valid.session";
import { HeaderBaseOptions } from "../header.base.options";

export interface SessionDataProvider {

  isValidSession(sessionId: string, options?: HeaderBaseOptions): Observable<ValidSession>;

  getSessionById(sessionId: string, options?: any): Observable<Session>;

  expireSession(sessionId: string, options?: any): Observable<number>;

  // USED BY OTHER REPO

  addSession(session: Session, options?: any): Observable<Session>;

}
