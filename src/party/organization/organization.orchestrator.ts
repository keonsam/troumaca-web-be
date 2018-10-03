import { createOrganizationRepository } from "../../adapter/party/organization.repository.factory";
import { OrganizationRepository } from "../../repository/organization.repository";
import { Organization } from "../../data/party/organization";
import { Observable, of, throwError } from "rxjs";
import { flatMap, map, switchMap, } from "rxjs/operators";
import { shapeOrganizationsResponse } from "./organization.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";
import {SessionRepository} from "../../repository/session.repository";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";
import { JoinOrganization } from "../../data/party/join.organization";

export class OrganizationOrchestrator {

  private organizationRepository: OrganizationRepository;
  private sessionRepository: SessionRepository;

  constructor() {
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
  }

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
      return this.organizationRepository.findOrganization(searchStr, pageSize);
  }

  getOrganizations (number: number, size: number, field: string, direction: string): Observable<Result<any>> {
      const sort = getSortOrderOrDefault(field, direction);
      // return this.organizationRepository.getOrganizations(number, size, sort)
      //     .pipe(flatMap(value => {
      //         return this.organizationRepository.getOrganizationCount()
      //             .pipe(map(count => {
      //                 // const shapeOrganizationsResp: any = shapeOrganizationsResponse(value, number, size, value.length, count, sort);
      //                 // return new Result<any>(false, "organizations", shapeOrganizationsResp);
      //                 // return new PageResponse(value, number, size, count, direction);
      //             }));
      //     }));
    return null;
  }

  getOrganization (partyId: string): Observable<Organization> {
      return this.organizationRepository.getOrganization(partyId);
  }

  saveOrganization (organization: Organization): Observable<Organization> {
      return this.organizationRepository.saveOrganization(organization);
  }

    saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization> {
        return this.organizationRepository.saveAccessRequest(request);
    }

    deleteOrganization (partyId: string): Observable<number> {
      return this.organizationRepository.deleteOrganization(partyId);
    }

    updateOrganization (partyId: string, organization: Organization): Observable<number> {
      return this.organizationRepository.updateOrganization(partyId, organization);
    }

}
