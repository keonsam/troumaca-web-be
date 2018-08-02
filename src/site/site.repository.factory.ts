import * as Rx from "rxjs";
import { SiteRepository } from "./site.repository";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { RepositoryKind } from "../repository.kind";
import { sites } from "../db";
import { UnionOfPhysicalSite } from "./union.of.physical.site";
import { Site } from "./site";

class SiteDBRepository implements SiteRepository {
  findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
    const searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer: Observer<UnionOfPhysicalSite[]>) {
      if (!searchStr) {
        sites.find({}).limit(100).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      } else {
        sites.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
    });
  }

  getSiteById(siteId: string): Observable<Site> {
    const query = {
      "siteId": siteId
    };
    return Rx.Observable.create(function (observer: Observer<Site>) {
      sites.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }


}

class SiteRestRepository implements SiteRepository {
  findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
    return undefined;
  }

  getSiteById(siteId: string): Observable<Site> {
    return undefined;
  }


}

export function createSiteRepository(kind?: RepositoryKind): SiteRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new SiteDBRepository();
    case RepositoryKind.Rest:
      return new SiteRestRepository();
    default:
      return new SiteDBRepository();
  }
}
