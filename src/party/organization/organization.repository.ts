import { Observable } from "rxjs";
import { Organization } from "./organization";

export interface OrganizationRepository {

  saveOrganization(organization: Organization): Observable<Organization>;

  getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]>;

  getOrganizationCount(): Observable<number>;

  getOrganization(partyId: string): Observable<Organization>;

  saveOrganization(organization: Organization): Observable<Organization>;

  deleteOrganization(partyId: string): Observable<number>;

  updateOrganization(partyId: string, organization: Organization): Observable<number>;

}
