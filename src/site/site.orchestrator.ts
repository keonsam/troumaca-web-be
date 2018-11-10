import {createSiteRepository} from "../adapter/site/site.repository.factory";
import {SiteRepository} from "../repository/site.repository";
import {Observable} from "rxjs";
import { Site } from "../data/site/site";

export class SiteOrchestrator {

  private siteRepository: SiteRepository;

  constructor() {
    this.siteRepository = createSiteRepository();
  }

  findSite(searchStr: string, pageSize: number): Observable<Site[]> {
    return this.siteRepository.findSite(searchStr, pageSize);
  }

}
