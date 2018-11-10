import {SiteRepository} from "../../repository/site.repository";
import {Site} from "../../data/site/site";
import {Observable} from "rxjs";

export class SiteRepositoryRestAdapter implements SiteRepository {

  findSite(searchStr: string, pageSize: number): Observable<Site[]> {
    return undefined;
  }

  getSiteById(siteId: string): Observable<Site> {
    return undefined;
  }
}