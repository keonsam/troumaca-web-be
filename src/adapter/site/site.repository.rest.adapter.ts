import { SiteRepository } from "../../repository/site.repository";
import { UnionOfPhysicalSite } from "../../data/site/union.of.physical.site";
import { Site } from "../../data/site/site";
import { Observable } from "rxjs";

export class SiteRepositoryRestAdapter implements SiteRepository {

    findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
        return undefined;
    }

    getSiteById(siteId: string): Observable<Site> {
        return undefined;
    }
}