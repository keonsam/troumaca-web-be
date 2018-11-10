import {Observable} from "rxjs";

export interface SearchRepository {
  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>>;
}