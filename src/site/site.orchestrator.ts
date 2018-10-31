import {createSiteRepository} from "../adapter/site/site.repository.factory";
import {SiteRepository} from "../repository/site.repository";
import {UnionOfPhysicalSite} from "../data/site/union.of.physical.site";
import {Observable} from "rxjs";

export class SiteOrchestrator {

  private siteRepository: SiteRepository;

  constructor() {
    this.siteRepository = createSiteRepository();
  }

  findSite(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSite[]> {
    return this.siteRepository.findSite(searchStr, pageSize);
  }

}
