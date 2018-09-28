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

    const json = person;

    const uriAndPath: string = uri + "/parties/persons";

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Person>) {
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

  findPerson(searchStr: string, pageSize: number): Observable<Person[]> {
    return undefined;
  }

}
