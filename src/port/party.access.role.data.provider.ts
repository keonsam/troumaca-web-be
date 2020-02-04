import {PartyAccessRole} from "../domain/model/authorization/party.access.role";
import {Observable} from "rxjs";

export interface PartyAccessRoleDataProvider {

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]>;

  getPartyAccessRoles(): Observable<PartyAccessRole[]>;

  // getPartyAccessRoleCount():Observable<number>;

  addPartyAccessRoles(partyAccessRole: string[], partyId: string): Observable<PartyAccessRole[]>;

  getPartyAccessRolesByPartyId(partyId: string): Observable<PartyAccessRole[]>;

  updatePartyAccessRole(partyAccessRoleId: string, partyAccessRole: PartyAccessRole): Observable<number>;

  updatePartyAccessRoles(partyAccessRoles: string[], partyId: string): Observable<PartyAccessRole[]>;

  deletePartyAccessRoles(partyId: string): Observable<number>;

  deletePartyAccessRoleByAccessRoleId(accessRoleId: string): Observable<number>;

}
