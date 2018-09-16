import { Session } from "../data/session/session";
import { Observable } from "rxjs";

export interface SessionRepository {

  isValidSession(sessionId: string, options?: any): Observable<boolean>;

  getSessionById(sessionId: string, options?: any): Observable<Session>;

  expireSession(sessionId: string, options?: any): Observable<number>;

  // getSessionByCredentialId(credentialId: string): Observable<Session>;
  //
  // getSessionByPartyId(partyId: string): Observable<Session>;
  //
  // getOrCreate(session:Session):Observable<Session>;
  //
  // updateSession(sessionId: string, session: Session): Observable<number>;
  //
  // updateSessionPartyId(sessionId: string, partyId: string): Observable<number>;

  // USED BY OTHER REPO

  addSession(session: Session, options?: any ): Observable<Session>;

}
