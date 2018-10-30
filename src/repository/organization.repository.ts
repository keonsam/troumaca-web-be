import { Organization } from "../data/party/organization";
import { Observable } from "rxjs";
import { JoinOrganization } from "../data/party/join.organization";

export interface OrganizationRepository {

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]>;

  saveCustomerOrganization(organization: Organization, options?: any): Observable<Organization>;

  saveOrganization(organization: Organization, options?: any): Observable<Organization>;

  getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]>;

  getOrganizationCount(): Observable<number>;

  getOrganization(partyId: string): Observable<Organization>;

  saveOrganization(organization: Organization): Observable<Organization>;

  saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization>;

  deleteOrganization(partyId: string): Observable<number>;

  updateOrganization(partyId: string, organization: Organization): Observable<number>;

}
