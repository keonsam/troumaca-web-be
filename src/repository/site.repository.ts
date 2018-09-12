import { Observable } from "rxjs/Observable";
import { UnionOfPhysicalSite } from "../data/site/union.of.physical.site";
import { Site } from "../data/site/site";

export interface SiteRepository {

  findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]>;

  getSiteById(siteId: string): Observable<Site>;

}
