import {Observable} from "rxjs";
import {WebSiteDataProvider} from "../../../port/web.site.data.provider";
import {WebSite} from "../../../domain/model/site/web.site";

export class RestWebSiteDataProvider implements WebSiteDataProvider {
  deleteWebSite(siteId: string): Observable<number> {
    return undefined;
  }

  getWebSiteById(siteId: string): Observable<WebSite> {
    return undefined;
  }

  getWebSiteCount(): Observable<number> {
    return undefined;
  }

  getWebSites(pageNumber: number, pageSize: number, order: string): Observable<WebSite[]> {
    return undefined;
  }

  saveWebSite(webSite: WebSite): Observable<WebSite> {
    return undefined;
  }

  updateWebSite(siteId: string, webSite: WebSite): Observable<number> {
    return undefined;
  }
}