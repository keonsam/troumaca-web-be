import {PersonRepository} from "../../repository/person.repository";
import {Person} from "../../data/party/person";
import {Observable, Observer} from "rxjs";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import request from "request";

export class PersonRestRepositoryAdapter implements PersonRepository {

  addPerson(person: Person, options?: any): Observable<Person> {
    const uri: string = properties.get("party.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = person.toJson();

    const uriAndPath: string = uri + "/parties/persons";

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    const isFailedRequest = function (response: any): boolean {
      if (!response) {
        return true;
      }

      if (!response.statusCode) {
        return true;
      }

      return !response.statusCode.toString().trim().startsWith("2");
    };

    return Observable.create(function (observer: Observer<Person>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            const errObj = new Error("Failure");
            if (error.code) {
              errObj.name = error.code;
            }
            observer.error(errObj);
          } else if (isFailedRequest(response)) {
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

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return undefined;
  }

}
