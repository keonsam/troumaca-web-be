import { Observable } from "rxjs/Observable";
import { Session } from "./session";

export interface SessionRepository {

  getSessionById(sessionId: string): Observable<Session> ;

  getSessionByCredentialId(credentialId: string): Observable<Session>;

  getSessionByPartyId(partyId: string): Observable<Session>;

  addSession(session: Session): Observable<Session>;

  // getOrCreate(session:Session):Observable<Session>;

  updateSession(sessionId: string, session: Session): Observable<number>;

  updateSessionPartyId(sessionId: string, partyId: string): Observable<number>;

  isValidSession(sessionId: string): Observable<boolean>;

  expireSession(sessionId: string): Observable<number>;

}
