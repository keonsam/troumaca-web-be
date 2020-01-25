import {SiteRepository} from "../../repository/site.repository";
import {Site} from "../../data/site/site";
import {Observable} from "rxjs";
import {HeaderBaseOptions} from "../../header.base.options";
import {Sites} from "../../data/site/sites";

export class SiteRepositoryRestAdapter implements SiteRepository {

  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]> {
    return undefined;
  }

  getSites(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<Sites> {
    return undefined;
  }

  // getSiteCount(options?: HeaderBaseOptions): Observable<number> {
  //   return undefined;
  // }

  getSiteById(siteId: string, options?: HeaderBaseOptions): Observable<Site> {
    return undefined;
  }

  saveSite(site: Site, options?: HeaderBaseOptions): Observable<Site> {
    return undefined;
  }

  updateSite(siteId: string, site: Site, options?: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  deleteSite(siteId: string, options?: HeaderBaseOptions): Observable<number> {
    return undefined;
  }
}
