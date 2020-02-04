import {OrganizationDataProvider} from "../../../port/organization.data.provider";
import {Observable, Observer} from "rxjs";
import {Organization} from "../../../domain/model/party/organization/organization";
import {properties} from "../../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../request.helpers";
// import { Confirmation } from "../../domain/model/authentication/confirmation";
import request from "request";
import {JoinOrganization} from "../../../domain/model/party/join.organization";
import { CompanyInfo } from "../../../domain/model/party/company.info";
import { HeaderBaseOptions } from "../../../header.base.options";

export class RestOrganizationDataProvider implements OrganizationDataProvider {

  // findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
  //   return undefined;
  // }
  //
  // addCustomer(organization: Organization, options?: any): Observable<Organization> {
  //   const uri: string = properties.get("party.host.port") as string;
  //
  //   const headerMap = jsonRequestHeaderMap(options ? options : {});
  //
  //   const json = organization;
  //
  //   const uriAndPath: string = uri + "/parties/organizations/customer";
  //
  //   const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);
  //
  //   return Observable.create(function (observer: Observer<Organization>) {
  //     request(requestOptions, function (error: any, response: any, body: any) {
  //       try {
  //         if (response && response.statusCode != 200) {
  //           observer.error(body);
  //         } else {
  //           observer.next(body);
  //         }
  //       } catch (e) {
  //         observer.error(new Error(e.message));
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  saveOrganization(organization: Organization, options?: any): Observable<Organization> {
    const uri: string = properties.get("party.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = organization;

    const uriAndPath: string = uri + "/parties/organizations";

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  // saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization> {
  //   return undefined;
  // }

  // deleteOrganization(partyId: string): Observable<number> {
  //   return undefined;
  // }
  //
  getOrganization(options: HeaderBaseOptions): Observable<Organization> {
    return undefined;
  }
  //
  // getOrganizationCount(): Observable<number> {
  //   return undefined;
  // }
  //
  // getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]> {
  //   return undefined;
  // }
  //
  updateOrganization(organization: Organization, options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }
  //
  // getCompany(partyId: any): Observable<CompanyInfo> {
  //   return undefined;
  // }
}
