import {PersonDataProvider} from "../../../port/person.data.provider";
import {Person} from "../../../domain/model/party/person/person";
import {Observable, Observer} from "rxjs";
import {properties} from "../../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../request.helpers";
import request from "request";
import { Credential } from "../../../domain/model/authentication/credential";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Persons } from "../../../domain/model/party/person/persons";
import { Sort } from "../../../util/sort";

export class RestPersonDataProvider implements PersonDataProvider {

  // addPerson(person: Person, options?: any): Observable<Person> {
  //   const uri: string = properties.get("party.host.port") as string;
  //
  //   const headerMap = jsonRequestHeaderMap(options ? options : {});
  //
  //   // const json = person.toJson();
  //
  //   // const uriAndPath: string = uri + "/parties/persons";
  //   const uriAndPath: string = uri + "/parties/persons/find-or-create";
  //
  //   const requestOptions: any = postJsonOptions(uriAndPath, headerMap, person);
  //
  //   const isFailedRequest = function (response: any): boolean {
  //     if (!response) {
  //       return true;
  //     }
  //
  //     if (!response.statusCode) {
  //       return true;
  //     }
  //
  //     return !response.statusCode.toString().trim().startsWith("2");
  //   };
  //
  //   return Observable.create(function (observer: Observer<Person>) {
  //     request(requestOptions, function (error: any, response: any, body: any) {
  //       try {
  //         if (error) {
  //           const errObj = new Error("Failure");
  //           if (error.code) {
  //             errObj.name = error.code;
  //           }
  //           observer.error(errObj);
  //         } else if (isFailedRequest(response)) {
  //           observer.error(body);
  //         } else {
  //           observer.next(body);
  //         }
  //       } catch (e) {
  //         observer.error(new Error(e.message));
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  findPeople(searchStr: string, options: HeaderBaseOptions): Observable<Person[]> {
    return undefined;
  }

  deletePerson(partyId: string, options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  getPerson(partyId: string, options: HeaderBaseOptions): Observable<Person> {
    return undefined;
  }

  getPersons(pageNumber: number, pageSize: number, order: Sort, options: HeaderBaseOptions): Observable<Persons> {
    return undefined;
  }

  savePerson(person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<Person> {
    return undefined;
  }

  updatePerson(partyId: string, person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  updatePersonMe(partyId: string, person: Person, options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

}

