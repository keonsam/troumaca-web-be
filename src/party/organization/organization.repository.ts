import { Observable } from "rxjs";
import { Organization } from "./organization";
import { JoinOrganizationRequest } from "./join.organization.request";

export interface OrganizationRepository {

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]>;

  saveOrganization(organization: Organization): Observable<Organization>;

  getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]>;

  getOrganizationCount(): Observable<number>;

  getOrganization(partyId: string): Observable<Organization>;

  saveOrganization(organization: Organization): Observable<Organization>;

  saveOrganizationRequest(joinRequest: JoinOrganizationRequest): Observable<JoinOrganizationRequest>;

  deleteOrganization(partyId: string): Observable<number>;

  updateOrganization(partyId: string, organization: Organization): Observable<number>;

}
