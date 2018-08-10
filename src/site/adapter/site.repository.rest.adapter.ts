import { SiteRepository } from "../site.repository";
import { Observable } from "rxjs/Observable";
import { UnionOfPhysicalSite } from "../union.of.physical.site";
import { Site } from "../site";

export class SiteRepositoryRestAdapter implements SiteRepository {

    findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
        return undefined;
    }

    getSiteById(siteId: string): Observable<Site> {
        return undefined;
    }
}