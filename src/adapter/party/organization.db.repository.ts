import {OrganizationRepository} from "../../repository/organization.repository";
import {Observable, Observer} from "rxjs";
import {Organization} from "../../data/party/organization";
import {organizations} from "../../db";
import {generateUUID} from "../../uuid.generator";
import {JoinOrganizationRequest} from "../../party/organization/join.organization.request";
import {calcSkip} from "../../db.util";

export class OrganizationDBRepository implements OrganizationRepository {

  private defaultPageSize: number = 100;

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<Organization[]>) {
      organizations.find(query).limit(100).exec(function (err: any, doc: any) {
        if (!err) {
          console.log(doc);
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveOrganization(organization: Organization, options?: any): Observable<Organization> {
    if (!organization.partyId) { organization.partyId = generateUUID(); }
    if (!organization.version) { organization.version = generateUUID(); }
    if (!organization.tenantPartyId) { organization.tenantPartyId = generateUUID(); }
    if (!organization.modifiedOn) { organization.modifiedOn = new Date(); }

    return Observable.create(function (observer: Observer<Organization>) {
      organizations.insert(organization, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveOrganizationRequest(joinRequest: JoinOrganizationRequest): Observable<JoinOrganizationRequest> {
    return Observable.create(function (observer: Observer<JoinOrganizationRequest>) {
      organizations.insert(joinRequest.toJson(), function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<Organization[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      organizations.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getOrganizationCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      organizations.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getOrganization(partyId: string): Observable<Organization> {
    return Observable.create(function (observer: Observer<Organization>) {
      const query = {
        "partyId": partyId
      };

      organizations.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteOrganization(partyId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "partyId": partyId
      };

      organizations.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateOrganization(partyId: string, organization: Organization): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "partyId": partyId
      };
      organizations.update(query, organization, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}