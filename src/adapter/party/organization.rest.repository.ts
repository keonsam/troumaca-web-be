import {OrganizationRepository} from "../../repository/organization.repository";
import {Observable, Observer} from "rxjs";
import {Organization} from "../../data/party/organization";
import {JoinOrganizationRequest} from "../../party/organization/join.organization.request";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
// import {Confirmation} from "../../data/authentication/confirmation";
import request from "request";

export class OrganizationRestRepository implements OrganizationRepository {

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
    return undefined;
  }

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

  saveOrganizationRequest(joinRequest: JoinOrganizationRequest): Observable<JoinOrganizationRequest> {
    return undefined;
  }

  deleteOrganization(partyId: string): Observable<number> {
    return undefined;
  }

  getOrganization(partyId: string): Observable<Organization> {
    return undefined;
  }

  getOrganizationCount(): Observable<number> {
    return undefined;
  }

  getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]> {
    return undefined;
  }

  updateOrganization(partyId: string, organization: Organization): Observable<number> {
    return undefined;
  }
}
