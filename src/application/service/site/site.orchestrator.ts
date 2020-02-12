import {createSiteDataProvider} from "../../../infrastructure/site/site.data.provider.factory";
import {SiteDataProvider} from "../../../port/site.data.provider";
import {Observable} from "rxjs";
import {HeaderBaseOptions} from "../../../header.base.options";
import {Site} from "../../../domain/model/site/site";
import {Sites} from "../../../domain/model/site/sites";

export class SiteOrchestrator {

  private siteRepository: SiteDataProvider;

  constructor() {
    this.siteRepository = createSiteDataProvider();
  }

  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]> {
    return this.siteRepository.findSite(searchStr, options);
  }

  getSites(search: string, number: number, size: number, options?: HeaderBaseOptions): Observable<Sites> {
    return this.siteRepository.getSites(search, number, size, options);
  }

  getSiteById(siteId: string, options?: HeaderBaseOptions): Observable<Site> {
    return this.siteRepository.getSiteById(siteId, options);
  }

  saveSite(site: Site, options?: HeaderBaseOptions): Observable<Site> {
    return this.siteRepository.saveSite(site, options);
  }

  updateSite(siteId: string, site: Site, options?: HeaderBaseOptions): Observable<number> {
    return this.siteRepository.updateSite(siteId, site, options);
  }

  deleteSite(siteId: string, options?: HeaderBaseOptions): Observable<number> {
    return this.siteRepository.deleteSite(siteId, options);
  }

}
