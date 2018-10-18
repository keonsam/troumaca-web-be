import { PartyAccessRole } from "../data/authorization/party.access.role";
import { Observable } from "rxjs";

export interface PartyAccessRoleRepository {

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]>;

  getPartyAccessRoles(): Observable<PartyAccessRole[]>;

  // getPartyAccessRoleCount():Observable<number>;

  addPartyAccessRoles(partyAccessRole: PartyAccessRole[], partyId: string): Observable<PartyAccessRole[]>;

  getPartyAccessRolesByPartyId(partyId: string): Observable<PartyAccessRole[]>;

  updatePartyAccessRole(partyAccessRoleId: string, partyAccessRole: PartyAccessRole): Observable<number>;

  updatePartyAccessRoles(partyAccessRoles: PartyAccessRole[], partyId: string): Observable<PartyAccessRole[]>;

  deletePartyAccessRole(partyId: string): Observable<number>;

  deletePartyAccessRoleByAccessRoleId(accessRoleId: string): Observable<number>;

}
