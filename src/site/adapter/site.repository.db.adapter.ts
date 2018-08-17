import { SiteRepository } from "../site.repository";
import { Observable } from "rxjs/Observable";
import { UnionOfPhysicalSite } from "../union.of.physical.site";
import { Observer } from "rxjs/Observer";
import { sites } from "../../db";
import { Site } from "../site";

export class SiteRepositoryNeDbAdapter implements SiteRepository {
    findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
        const searchStrLocal = new RegExp(searchStr);
        return Observable.create(function (observer: Observer<UnionOfPhysicalSite[]>) {
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