import {Grant} from "../data/authorization/grant";
import {Observable} from "rxjs";

export interface GrantRepository {

  getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]>;

  addGrant(grants: Grant[]): Observable<Grant[]>;

  getGrantById(grantId: string, ownerPartyId: string): Observable<Grant>;

  updateGrant(grantId: string, grant: Grant): Observable<number>;

  deleteGrant(accessRoleId: string): Observable<number>;

}

