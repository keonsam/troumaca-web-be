import {SearchRepository} from "../../repository/search.repository";
import {Observable, Observer} from "rxjs";
import {properties} from "../../properties.helpers";
import {getJsonOptions} from "../../request.helpers";
import {Organization} from "../../data/party/organization";
import request from "request";

export class SearchRepositoryRestAdapter implements SearchRepository {

  search(indexName: string, map: Map<string, Object>, options?: any): Observable<Map<string, Object>> {
    const uri: string = properties.get("search.host.port") as string;

    // const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = JSON.parse(mapToJson(map));

    const uriAndPath: string = `${uri}/rummage/search/${indexName}`;

    const requestOptions: any = getJsonOptions(uriAndPath, options, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }
}

function mapToJson(map: Map<string, Object>): string {
  return JSON.stringify(map);
}