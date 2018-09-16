import { createOrganizationRepository } from "../../adapter/party/organization.repository.factory";
import { OrganizationRepository } from "../../repository/organization.repository";
import { Organization } from "../../data/party/organization";
import { Observable, of } from "rxjs";
import { flatMap, map, switchMap } from "rxjs/operators";
import { shapeOrganizationsResponse } from "./organization.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { JoinOrganizationRequest } from "./join.organization.request";
import {SessionRepository} from "../../repository/session.repository";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";

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

  sendJoinRequest(request: string, sessionId?: string): Observable<JoinOrganizationRequest> {
    // This is just basic boilerplate logic
    //   return this.sessionRepository.getSessionById(sessionId)
    //       .pipe( switchMap( session => {
    //         if (!session) {
    //           return of(undefined);
    //         } else {
    //           // const joinRequest: JoinOrganizationRequest = new JoinOrganizationRequest(session.partyId, request);
    //           // joinRequest.status = "pending entry to organization";
    //           // return this.organizationRepository.saveOrganizationRequest(joinRequest);
    //         }
    //       }));
    return null;
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

  getOrganization (partyId: string, sessionId?: string): Observable<Organization> {
      if (partyId === "company") {
          return this.sessionRepository.getSessionById(sessionId)
              .pipe(switchMap(session => {
                  if (!session) return of(undefined);
                  // return this.organizationRepository.getOrganization(session.partyId);
              }));
      } else {
          return this.organizationRepository.getOrganization(partyId);
      }
  }

    saveOrganization (organization: Organization, sessionId: string, type: string): Observable<Organization> {
      if (type === "company") {
          return this.sessionRepository.getSessionById(sessionId)
              .pipe( switchMap( session => {
                  if (!session) {
                      return of(undefined);
                  } else {
                      // organization.partyId = session.partyId;
                      // return this.organizationRepository.saveOrganization(organization);
                  }
          }));
      } else {
          return this.organizationRepository.saveOrganization(organization);
      }
    }

    deleteOrganization (partyId: string): Observable<number> {
      return this.organizationRepository.deleteOrganization(partyId);
    }

    updateOrganization (partyId: string, organization: Organization): Observable<number> {
      return this.organizationRepository.updateOrganization(partyId, organization);
    }

}
