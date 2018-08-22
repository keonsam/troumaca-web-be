import { createOrganizationRepository } from "./organization.repository.factory";
import { OrganizationRepository } from "./organization.repository";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Organization } from "./organization";
import { shapeOrganizationsResponse } from "./organization.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";

export class OrganizationOrchestrator {

  private organizationRepository: OrganizationRepository;

  constructor() {

    this.organizationRepository = createOrganizationRepository();
  }

    getOrganizations (number: number, size: number, field: string, direction: string): Observable<Result<any>> {
      const sort = getSortOrderOrDefault(field, direction);
      return this.organizationRepository.getOrganizations(number, size, sort)
        .pipe(flatMap(value => {
          return this.organizationRepository.getOrganizationCount()
            .pipe(map(count => {
               const shapeOrganizationsResp: any = shapeOrganizationsResponse(value, number, size, value.length, count, sort);
               return new Result<any>(false, "organizations", shapeOrganizationsResp);
              // return new PageResponse(value, number, size, count, direction);
            }));
        }));
    }

    getOrganization (partyId: string): Observable<Organization> {
      return this.organizationRepository.getOrganization(partyId);
    }

    saveOrganization (organization: Organization): Observable<Organization> {
      return this.organizationRepository.saveOrganization(organization);
    }

    deleteOrganization (partyId: string): Observable<number> {
      return this.organizationRepository.deleteOrganization(partyId);
    }

    updateOrganization (partyId: string, organization: Organization): Observable<number> {
      return this.organizationRepository.updateOrganization(partyId, organization);
    }

}
