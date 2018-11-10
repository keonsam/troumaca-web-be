import {SiteRepository} from "../../repository/site.repository";
import {Observable, Observer} from "rxjs";
import {sites} from "../../db";
import {Site} from "../../data/site/site";

export class SiteRepositoryNeDbAdapter implements SiteRepository {
  findSite(searchStr: string, pageSize: number): Observable<Site[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<Site[]>) {
      sites.find(query).limit(100).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getSiteById(siteId: string): Observable<Site> {
    const query = {
      "siteId": siteId
    };
    return Observable.create(function (observer: Observer<Site>) {
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

  // USED BY OTHER REPOS
  getSitesByIds(siteIds: string[]): Observable<Site[]> {
    return Observable.create((observer: Observer<Site>) => {
      sites.find({siteId: {$in: siteIds}}, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}