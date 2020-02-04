import {SiteDataProvider} from "../../../port/site.data.provider";
import {Observable, Observer} from "rxjs";
import { sites} from "../../../db";
import {Site} from "../../../domain/model/site/site";
import {HeaderBaseOptions} from "../../../header.base.options";
import {generateUUID} from "../../../uuid.generator";
import {Sites} from "../../../domain/model/site/sites";

export class NedbSiteDataProvider implements SiteDataProvider {
  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]> {
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

  getSites(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<Sites> {
    return Observable.create(function (observer: Observer<Sites>) {
      sites.count({ownerPartyId: options.ownerPartyId }, function (err, count) {
        // const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        // const generate = SortGenerator.generate(sort);
        const skipAmount = pageNumber ? pageNumber * pageSize : 0;
        sites.find({
          // ownerPartyId: options.ownerPartyId,
          name: new RegExp(search),
        })
            .skip(skipAmount)
            .limit(pageSize)
            .exec((err: any, docs: Site[]) => {
              if (!err) {
                observer.next(new Sites(docs));
              } else {
                observer.error(err);
              }
              observer.complete();
            });
      });
    });
  }

  // getSiteCount(options?: HeaderBaseOptions): Observable<number> {
  //     const query = {
  //         // ownerPartyId: options["Owner-Party-Id"]
  //     };
  //     return Observable.create(function (observer: Observer<number>) {
  //         assetSites.count(query, function (err: any, count: number) {
  //             if (!err) {
  //                 observer.next(count);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }

  getSiteById(siteId: string, options?: HeaderBaseOptions): Observable<Site> {
    return Observable.create((observer: Observer<Site>) => {
      const query = {
        "siteId": siteId,
        // ownerPartyId: options["Owner-Party-Id"]
      };
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

  saveSite(site: Site, options?: HeaderBaseOptions): Observable<Site> {
    site.siteId = generateUUID();
    // site.ownerPartyId = options.ownerPartyId;
    return Observable.create(function (observer: Observer<Site>) {
      sites.insert(site, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateSite(siteId: string, site: Site, options?: HeaderBaseOptions): Observable<number> {
    const query = {
      siteId
      // ownerPartyId: options["Owner-Party-Id"]
    };
    return Observable.create(function (observer: Observer<number>) {
      sites.update(query, { $set: site}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteSite(siteId: string, options?: HeaderBaseOptions): Observable<number> {
    const query = {
      siteId,
      // ownerPartyId: options["Owner-Party-Id"]
    };
    return Observable.create(function (observer: Observer<number>) {
      sites.remove(query, {}, function (err: any, numRemoved: number) {
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
