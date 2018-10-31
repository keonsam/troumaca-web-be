import {WebSiteRepository} from "../../repository/web.site.repository";
import {Observable, Observer} from "rxjs";
import {RepositoryKind} from "../../repository.kind";
import {webSites} from "../../db";
import {WebSite} from "../../data/site/web.site";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";

class WebSiteDBRepository implements WebSiteRepository {

  private defaultPageSize: number = 10;

  saveWebSite(webSite: WebSite): Observable<WebSite> {
    webSite.siteId = generateUUID();
    return Observable.create(function (observer: Observer<WebSite>) {
      webSites.insert(webSite, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(webSite);
        }
        observer.complete();
      });
    });
  }

  getWebSites(pageNumber: number, pageSize: number, order: string): Observable<WebSite[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<WebSite[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      webSites.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getWebSiteCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      webSites.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getWebSiteById(siteId: string): Observable<WebSite> {
    return Observable.create(function (observer: Observer<WebSite>) {
      const query = {
        "siteId": siteId
      };
      webSites.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateWebSite(siteId: string, webSite: WebSite): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "siteId": siteId
      };
      webSites.update(query, webSite, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteWebSite(siteId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "siteId": siteId
      };
      webSites.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}

class WebSiteRestRepository implements WebSiteRepository {

  deleteWebSite(siteId: string): Observable<number> {
    return undefined;
  }

  getWebSiteById(siteId: string): Observable<WebSite> {
    return undefined;
  }

  getWebSiteCount(): Observable<number> {
    return undefined;
  }

  getWebSites(pageNumber: number, pageSize: number, order: string): Observable<WebSite[]> {
    return undefined;
  }

  saveWebSite(webSite: WebSite): Observable<WebSite> {
    return undefined;
  }

  updateWebSite(siteId: string, webSite: WebSite): Observable<number> {
    return undefined;
  }
}

export function createWebSiteRepository(kind?: RepositoryKind): WebSiteRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new WebSiteDBRepository();
    case RepositoryKind.Rest:
      return new WebSiteRestRepository();
    default:
      return new WebSiteDBRepository();
  }
}
