import {createOrganizationRepository} from "../../adapter/party/organization.repository.factory";
import {OrganizationRepository} from "../../repository/organization.repository";
import {Organization} from "../../data/party/organization";
import {Observable, throwError} from "rxjs";
import {flatMap, map, switchMap} from "rxjs/operators";
import {shapeOrganizationsResponse} from "./organization.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {SessionRepository} from "../../repository/session.repository";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";
import {JoinOrganization} from "../../data/party/join.organization";
import {CredentialRepository} from "../../repository/credential.repository";
import {createCredentialRepositoryFactory} from "../../adapter/authentication/credential.repository.factory";
import { OrganizationCompany } from "../../data/party/organization.company";

export class OrganizationOrchestrator {

  private organizationRepository: OrganizationRepository;
  private sessionRepository: SessionRepository;
  private credentialRepository: CredentialRepository;

  constructor() {
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
    return this.organizationRepository.findOrganization(searchStr, pageSize);
  }

  getOrganizations (number: number, size: number, field: string, direction: string): Observable<Result<any>> {
      const sort = getSortOrderOrDefault(field, direction);
      return this.organizationRepository.getOrganizations(number, size, sort)
          .pipe(flatMap(value => {
              return this.organizationRepository.getOrganizationCount()
                  .pipe(map(count => {
                      const shapeOrganizationsResp: any = shapeOrganizationsResponse(value, number, size, value.length, count, sort);
                      return new Result<any>(false, "organizations", shapeOrganizationsResp);
                  }));
          }));
  }

  getOrganization(partyId: string): Observable<Organization> {
    return this.organizationRepository.getOrganization(partyId);
  }

  getOrganizationCompany(partyId: any): Observable<OrganizationCompany> {
      return this.organizationRepository.getOrganizationCompany(partyId);
  }

  saveOrganization(organization: Organization): Observable<Organization> {
    return this.organizationRepository.saveOrganization(organization);
  }

  addCustomer(organization: Organization, options?: any): Observable<Organization> {
    return this.organizationRepository.addCustomer(organization, options);
      // .pipe(switchMap(organizationRes => {
      //   if (!organizationRes) {
      //     return throwError("Failed to save organization.");
      //   } else {
      //     return this.credentialRepository.updateCredentialStatusByPartyId(organization.partyId, "Active")
      //       .pipe(map(numUpdated => {
      //         if (!numUpdated) {
      //           throw new Error("credential status was not updated.");
      //         } else {
      //           return organizationRes;
      //         }
      //       }));
      //   }
      // }))
  }

  saveOrganizationCompany(organization: Organization): Observable<Organization> {
    return this.organizationRepository.saveOrganization(organization)
      .pipe(switchMap(organizationRes => {
        if (!organizationRes) {
          return throwError("Failed to save organization.");
        } else {
          return this.credentialRepository.updateCredentialStatusByPartyId(organization.partyId, "Active")
            .pipe(map(numUpdated => {
              if (!numUpdated) {
                throw new Error("credential status was not updated.");
              } else {
                return organizationRes;
              }
            }));
        }
      }));
  }

  saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization> {
    return this.organizationRepository.saveAccessRequest(request)
      .pipe(switchMap(requestRes => {
        if (!requestRes) {
          return throwError("Failed to save organization access request.");
        } else {
          return this.credentialRepository.updateCredentialStatusByPartyId(request.partyId, "Active")
            .pipe(map(numUpdated => {
              if (!numUpdated) {
                throw new Error("credential status was not updated.");
              } else {
                return requestRes;
              }
            }));
        }
      }));
  }

  deleteOrganization(partyId: string): Observable<number> {
    return this.organizationRepository.deleteOrganization(partyId);
  }

  updateOrganization(partyId: string, organization: Organization): Observable<number> {
    return this.organizationRepository.updateOrganization(partyId, organization);
  }

}
