import {SearchDataProvider} from "../../../port/search.data.provider";
import {Observable} from "rxjs";

export class NedbSearchDataProvider implements SearchDataProvider {

  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>> {
    throw new Error("Not implemented.");
  }

}
