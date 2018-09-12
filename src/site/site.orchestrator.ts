import { createSiteRepository } from "../adapter/site/site.repository.factory";
import { SiteRepository } from "../repository/site.repository";
import { Observable } from "rxjs/Observable";
import { UnionOfPhysicalSite } from "../data/site/union.of.physical.site";

export class SiteOrchestrator {

  private siteRepository: SiteRepository;

  constructor() {
    this.siteRepository = createSiteRepository();
  }

  findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
    return this.siteRepository.findSite(searchStr, pageSize);
  }

}
