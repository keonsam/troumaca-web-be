import { Observable } from "rxjs/Observable";
import { UnionOfPhysicalSite } from "./union.of.physical.site";
import { Site } from "./site";

export interface SiteRepository {

  findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]>;

  getSiteById(siteId: string): Observable<Site>;

}
