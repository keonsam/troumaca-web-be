import {createOrganizationRepository} from "../../adapter/party/organization.repository.factory";
import {OrganizationRepository} from "../../repository/organization.repository";
import {Organization} from "../../data/party/organization";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../../header.base.options";

export class OrganizationOrchestrator {

  private organizationRepository: OrganizationRepository;

  constructor() {
    this.organizationRepository = createOrganizationRepository();
  }

  // findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
  //   return this.organizationRepository.findOrganization(searchStr, pageSize);
  // }

  // getOrganizations (number: number, size: number, field: string, direction: string): Observable<Result<any>> {
  //     const sort = getSortOrderOrDefault(field, direction);
  //     return this.organizationRepository.getOrganizations(number, size, sort)
  //         .pipe(flatMap(value => {
  //             return this.organizationRepository.getOrganizationCount()
  //                 .pipe(map(count => {
  //                     const shapeOrganizationsResp: any = shapeOrganizationsResponse(value, number, size, value.length, count, sort);
  //                     return new Result<any>(false, "organizations", shapeOrganizationsResp);
  //                 }));
  //         }));
  // }

  getOrganization(options: HeaderBaseOptions): Observable<Organization> {
    return this.organizationRepository.getOrganization(options);
  }

  saveOrganization(organization: Organization, options?: HeaderBaseOptions): Observable<Organization> {
    return this.organizationRepository.saveOrganization(organization, options);
  }

  updateOrganization(organization: Organization, options: HeaderBaseOptions): Observable<number> {
    return this.organizationRepository.updateOrganization(organization, options);
  }

  // addCustomer(organization: Organization, options?: any): Observable<Organization> {
  //   return this.organizationRepository.addCustomer(organization, options);
  // }

  // saveOrganizationCompany(organization: Organization): Observable<Organization> {
  //     return undefined;
  //   // return this.organizationRepository.saveOrganization(organization)
  //   //   .pipe(switchMap(organizationRes => {
  //   //     if (!organizationRes) {
  //   //       return throwError("Failed to save organization.");
  //   //     } else {
  //   //       return this.credentialRepository.updateCredentialStatusByPartyId(organization.partyId, "Active")
  //   //         .pipe(map(numUpdated => {
  //   //           if (!numUpdated) {
  //   //             throw new Error("credential status was not updated.");
  //   //           } else {
  //   //             return organizationRes;
  //   //           }
  //   //         }));
  //   //     }
  //   //   }));
  // }

  // saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization> {
  //   return this.organizationRepository.saveAccessRequest(request)
  //     .pipe(switchMap(requestRes => {
  //       if (!requestRes) {
  //         return throwError("Failed to save organization access request.");
  //       } else {
  //         return this.credentialRepository.updateCredentialStatusByPartyId(request.partyId, "Active")
  //           .pipe(map(numUpdated => {
  //             if (!numUpdated) {
  //               throw new Error("credential status was not updated.");
  //             } else {
  //               return requestRes;
  //             }
  //           }));
  //       }
  //     }));
  // }

  // deleteOrganization(partyId: string): Observable<number> {
  //   return this.organizationRepository.deleteOrganization(partyId);
  // }
  //
  //
  // getCompany(options: any): Observable<CompanyInfo> {
  //     return this.organizationRepository.getCompany(options);
  // }
}
