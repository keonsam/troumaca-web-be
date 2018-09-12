import { PartyAccessRole } from "../data/authorization/party.access.role";
import { Observable } from "rxjs/Observable";

export interface PartyAccessRoleRepository {

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]>;

  getPartyAccessRoles(): Observable<PartyAccessRole[]>;

  // getPartyAccessRoleCount():Observable<number>;

  addPartyAccessRole(partyAccessRole: PartyAccessRole[]): Observable<PartyAccessRole[]>;

  getPartyAccessRoleById(partyId: string): Observable<PartyAccessRole[]>;

  updatePartyAccessRole(partyAccessRoleId: string, partyAccessRole: PartyAccessRole): Observable<number>;

  deletePartyAccessRole(partyId: string): Observable<number>;

  deletePartyAccessRoleByAccessRoleId(accessRoleId: string): Observable<number>;

}
