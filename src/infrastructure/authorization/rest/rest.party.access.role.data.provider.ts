import {PartyAccessRoleDataProvider} from "../../../port/party.access.role.data.provider";
import {PartyAccessRole} from "../../../domain/model/authorization/party.access.role";
import {Observable} from "rxjs";

export class RestPartyAccessRoleDataProvider implements PartyAccessRoleDataProvider {

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]> {
  //   return undefined;
  // };
  //

  getPartyAccessRoles(): Observable<PartyAccessRole[]> {
    return undefined;
  }

  //
  // getPartyAccessRoleCount():Observable<number> {
  //   return undefined;
  // }

  addPartyAccessRoles(partyAccessRole: string[], partyId: string): Observable<PartyAccessRole[]> {
    return undefined;
  }

  deletePartyAccessRoles(partyId: string): Observable<number> {
    return undefined;
  }

  deletePartyAccessRoleByAccessRoleId(accessRoleId: string): Observable<number> {
    return undefined;
  }

  getPartyAccessRolesByPartyId(partyId: string): Observable<PartyAccessRole[]> {
    return undefined;
  }

  updatePartyAccessRole(partyAccessRoleId: string, partyAccessRole: PartyAccessRole): Observable<number> {
    return undefined;
  }

  updatePartyAccessRoles(partyAccessRoles: string[], partyId: string): Observable<PartyAccessRole[]> {
    return undefined;
  }

}


