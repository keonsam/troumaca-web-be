import {WebSite} from "../domain/model/site/web.site";
import {Observable} from "rxjs";

export interface WebSiteDataProvider {
  saveWebSite(webSite: WebSite): Observable<WebSite>;

  getWebSites(pageNumber: number, pageSize: number, order: string): Observable<WebSite[]>;

  getWebSiteCount(): Observable<number>;

  getWebSiteById(siteId: string): Observable<WebSite>;

  updateWebSite(siteId: string, webSite: WebSite): Observable<number>;

  deleteWebSite(siteId: string): Observable<number>;
}
