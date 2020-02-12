import {SearchDataProvider} from "../../../port/search.data.provider";
import {createSearchDataProvider} from "../../../infrastructure/search/search.data.provider.factory";
import {Observable} from "rxjs";

export class SearchOrchestrator {

  private searchRepository: SearchDataProvider;

  constructor() {
    this.searchRepository = createSearchDataProvider();
  }

  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>> {
    return this.searchRepository.search(indexName, map, options);
  }

}