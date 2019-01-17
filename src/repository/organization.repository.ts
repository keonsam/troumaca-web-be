import {Organization} from "../data/party/organization";
import {Observable} from "rxjs";
import {JoinOrganization} from "../data/party/join.organization";
import { OrganizationCompany } from "../data/party/organization.company";

export interface OrganizationRepository {

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]>;

  addCustomer(organization: Organization, options?: any): Observable<Organization>;

  saveOrganization(organization: Organization, options?: any): Observable<Organization>;

  getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]>;

  getOrganizationCount(): Observable<number>;

  getOrganization(partyId: string): Observable<Organization>;

  getOrganizationCompany(partyId: any): Observable<OrganizationCompany>;

  saveOrganization(organization: Organization): Observable<Organization>;

  saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization>;

  deleteOrganization(partyId: string): Observable<number>;

  updateOrganization(partyId: string, organization: Organization): Observable<number>;

}
