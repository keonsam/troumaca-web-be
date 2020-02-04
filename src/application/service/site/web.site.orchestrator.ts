import {createWebSiteDataProvider} from "../../../infrastructure/site/web.site.data.provider.factory";
import {WebSiteDataProvider} from "../../../port/web.site.data.provider";
import {Observable} from "rxjs";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {shapeWebSitesResponse} from "./web.site.response.shaper";
import {WebSite} from "../../../domain/model/site/web.site";
import {Result} from "../../../result.success";
import {flatMap, map} from "rxjs/operators";

export class WebSiteOrchestrator {

  private webSiteRepository: WebSiteDataProvider;

  constructor() {
    this.webSiteRepository = createWebSiteDataProvider();
  }

  saveWebSite(webSite: WebSite): Observable<WebSite> {
    return this.webSiteRepository.saveWebSite(webSite);
  }

  getWebSites(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.webSiteRepository
      .getWebSites(number, size, sort)
      .pipe(flatMap(value => {
        return this.webSiteRepository
          .getWebSiteCount()
          .pipe(map(count => {
            const shapeWebSitesResp: any = shapeWebSitesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "webSites", shapeWebSitesResp);
          }));
      }));
  }

  getWebSiteById(siteId: string): Observable<WebSite> {
    return this.webSiteRepository.getWebSiteById(siteId);
  }

  updateWebSite(siteId: string, webSite: WebSite): Observable<number> {
    return this.webSiteRepository.updateWebSite(siteId, webSite);
  }

  deleteWebSite(siteId: string): Observable<number> {
    return this.webSiteRepository.deleteWebSite(siteId);
  }


}
