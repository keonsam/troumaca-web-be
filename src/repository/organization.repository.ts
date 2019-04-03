import {Organization} from "../data/party/organization";
import {Observable} from "rxjs";
import {JoinOrganization} from "../data/party/join.organization";
import { CompanyInfo } from "../data/party/company.info";
import { HeaderBaseOptions } from "../header.base.options";

export interface OrganizationRepository {

  // findOrganization(searchStr: string, pageSize: number): Observable<Organization[]>;
  //
  // addCustomer(organization: Organization, options?: any): Observable<Organization>;
  //
  // saveOrganization(organization: Organization, options?: any): Observable<Organization>;
  //
  // getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]>;
  //
  // getOrganizationCount(): Observable<number>;
  //
  // getOrganization(partyId: string): Observable<Organization>;

  saveOrganization(organization: Organization, options?: HeaderBaseOptions): Observable<Organization>;

  // saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization>;

  // deleteOrganization(partyId: string): Observable<number>;
  //
  // updateOrganization(partyId: string, organization: Organization): Observable<number>;
  //
  // getCompany(options: any): Observable<CompanyInfo>;
}
