import {Organization} from "../domain/model/party/organization";
import {Observable} from "rxjs";
import {JoinOrganization} from "../domain/model/party/join.organization";
import { CompanyInfo } from "../domain/model/party/company.info";
import { HeaderBaseOptions } from "../header.base.options";

export interface OrganizationDataProvider {

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
  getOrganization(options: HeaderBaseOptions): Observable<Organization>;

  saveOrganization(organization: Organization, options?: HeaderBaseOptions): Observable<Organization>;

  // saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization>;

  // deleteOrganization(partyId: string): Observable<number>;
  //
  updateOrganization(organization: Organization, options: HeaderBaseOptions): Observable<number>;
  //
  // getCompany(options: any): Observable<CompanyInfo>;
}
