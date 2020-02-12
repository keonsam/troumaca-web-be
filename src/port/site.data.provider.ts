import {Site} from "../domain/model/site/site";
import {Observable} from "rxjs";
import {HeaderBaseOptions} from "../header.base.options";
import {Sites} from "../domain/model/site/sites";

export interface SiteDataProvider {

  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]>;

  getSites(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<Sites>;


  getSiteById(siteId: string, options?: HeaderBaseOptions): Observable<Site>;

  saveSite(site: Site, options?: HeaderBaseOptions): Observable<Site>;

  updateSite(siteId: string, site: Site, options?: HeaderBaseOptions): Observable<number>;

  deleteSite(siteId: string, options?: HeaderBaseOptions): Observable<number>;

}
