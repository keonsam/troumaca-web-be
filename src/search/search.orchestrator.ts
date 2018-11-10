import {SearchRepository} from "../repository/search.repository";
import {createSearchRepositoryFactory} from "../adapter/search/search.repository.factory";
import {Observable} from "rxjs";

export class SearchOrchestrator {

  private searchRepository: SearchRepository;

  constructor() {
    this.searchRepository = createSearchRepositoryFactory();
  }

  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>> {
    return this.searchRepository.search(indexName, map, options);
  }

}