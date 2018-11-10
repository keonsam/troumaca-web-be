import {SearchRepository} from "../../repository/search.repository";
import {Observable} from "rxjs";

export class SearchRepositoryNeDbAdapter implements SearchRepository {

  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>> {
    throw new Error("Not implemented.");
  }

}
