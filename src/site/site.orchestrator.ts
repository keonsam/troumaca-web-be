import {createSiteRepository} from "../adapter/site/site.repository.factory";
import {SiteRepository} from "../repository/site.repository";
import {Observable} from "rxjs";
import { Site } from "../data/site/site";
import {HeaderBaseOptions} from "../header.base.options";

export class SiteOrchestrator {

  private siteRepository: SiteRepository;

  constructor() {
    this.siteRepository = createSiteRepository();
  }

  findSite(searchStr: string, options: HeaderBaseOptions): Observable<Site[]> {
    return this.siteRepository.findSite(searchStr, options);
  }

}
