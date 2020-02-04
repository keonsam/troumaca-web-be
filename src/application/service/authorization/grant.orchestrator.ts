import {GrantDataProvider} from "../../../port/grant.data.provider";
import {createGrantDataProvider} from "../../../infrastructure/authorization/grant.data.provider.factory";
import {Grant} from "../../../domain/model/authorization/grant";
import {Observable} from "rxjs";

export class GrantOrchestrator {

  private grantRepository: GrantDataProvider;

  constructor() {
    this.grantRepository = createGrantDataProvider();
  }

  getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]> {
    return this.grantRepository.getGrantsByAccessRoleId(accessRoleId);
  }

  addGrant(grants: Grant[]): Observable<Grant[]> {
    return this.grantRepository.addGrant(grants);
  }

  getGrantById(grantId: string, ownerPartyId: string): Observable<Grant> {
    return this.grantRepository.getGrantById(grantId, ownerPartyId);
  }

  updateGrant(grantId: string, grant: Grant): Observable<number> {
    return this.grantRepository.updateGrant(grantId, grant);
  }

  deleteGrant(accessRoleId: string): Observable<number> {
    return this.grantRepository.deleteGrant(accessRoleId);
  }

}







