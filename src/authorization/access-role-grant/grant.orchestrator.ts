import {GrantRepository} from "../../repository/grant.repository";
import {createGrantRepositoryFactory} from "../../adapter/authorization/grant.repository.factory";
import {Grant} from "../../data/authorization/grant";
import {Observable} from "rxjs";

export class GrantOrchestrator {

  private grantRepository: GrantRepository;

  constructor() {
    this.grantRepository = createGrantRepositoryFactory();
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







