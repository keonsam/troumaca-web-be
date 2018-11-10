import {Site} from "../data/site/site";
import {Observable} from "rxjs";

export interface SiteRepository {

  findSite(searchStr: string, pageSize: number): Observable<Site[]>;

  getSiteById(siteId: string): Observable<Site>;

}
