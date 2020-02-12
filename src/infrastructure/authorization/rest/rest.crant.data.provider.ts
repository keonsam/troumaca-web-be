import {GrantDataProvider} from "../../../port/grant.data.provider";
import {Grant} from "../../../domain/model/authorization/grant";
import {Observable, Observer} from "rxjs";

export class RestGrantDataProvider implements GrantDataProvider {

  getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]> {
    return undefined;
  }

  addGrant(grant: Grant[]): Observable<Grant[]> {
    return undefined;
  }

  deleteGrant(accessRoleId: string): Observable<number> {
    return undefined;
  }

  getGrantById(grantId: string, ownerPartyId: string): Observable<Grant> {
    return undefined;
  }

  updateGrant(grantId: string, grant: Grant): Observable<number> {
    return undefined;
  }

}
