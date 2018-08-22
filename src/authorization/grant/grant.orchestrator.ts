import { GrantRepository } from "./grant.repository";
import { createGrantRepositoryFactory } from "./grant.repository.factory";
import { Observable } from "rxjs";
import { Grant } from "./grant";

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







