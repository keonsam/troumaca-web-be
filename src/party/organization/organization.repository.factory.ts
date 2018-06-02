import * as Rx from 'rxjs';
import {OrganizationRepository} from "./organization.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {Organization} from "./organization";
import {organizations} from "../../db";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";

class OrganizationDBRepository implements OrganizationRepository {

  private defaultPageSize:number = 100;

  saveOrganization(organization:Organization):Observable<Organization> {
    if(!organization.partyId) {
      organization.partyId = generateUUID();
    }
    return Rx.Observable.create(function (observer:Observer<Organization>) {
      organizations.insert(organization, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getOrganizations(pageNumber:number, pageSize:number, order:string):Observable<Organization[]> {
    let localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<Organization[]>) {
      let skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      organizations.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getOrganizationCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      organizations.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getOrganization(partyId:string):Observable<Organization> {
    return Rx.Observable.create(function (observer:Observer<Organization>) {
      let query = {
        "partyId":partyId
      };

      organizations.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteOrganization(partyId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };

      organizations.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  updateOrganization(partyId:string, organization:Organization):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };
      organizations.update(query, organization, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }
}

class OrganizationRestRepository implements OrganizationRepository {

  saveOrganization(organization: Organization): Observable<Organization> {
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

export function createOrganizationRepository(kind?:RepositoryKind):OrganizationRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new OrganizationDBRepository();
    case RepositoryKind.Rest:
      return new OrganizationRestRepository();
    default:
      return new OrganizationDBRepository();
  }
}
