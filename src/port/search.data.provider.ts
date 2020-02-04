import {Observable} from "rxjs";

export interface SearchDataProvider {
  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>>;
}