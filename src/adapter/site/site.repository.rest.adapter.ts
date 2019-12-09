import {SiteRepository} from "../../repository/site.repository";
import {Site} from "../../data/site/site";
import {Observable} from "rxjs";
import {HeaderBaseOptions} from "../../header.base.options";

export class SiteRepositoryRestAdapter implements SiteRepository {

  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]> {
    return undefined;
  }

  getSiteById(siteId: string): Observable<Site> {
    return undefined;
  }
}