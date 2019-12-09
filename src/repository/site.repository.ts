import {Site} from "../data/site/site";
import {Observable} from "rxjs";
import {HeaderBaseOptions} from "../header.base.options";

export interface SiteRepository {

  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]>;

  getSiteById(siteId: string): Observable<Site>;

}
