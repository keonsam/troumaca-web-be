import {PartyRelationshipRepository} from "../../repository/party.relationship.repository";
import {Observable, Observer} from "rxjs";
import {PartyRelationship} from "../../data/contract/party.relationship";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, getJsonOptions} from "../../request.helpers";
import {Organization} from "../../data/party/organization";
import request from "request";

export class PartyRelationshipRepositoryRestAdapter implements PartyRelationshipRepository {

  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship> {
    const uri: string = properties.get("contract.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = {toPartyId: toPartyId};

    const uriAndPath: string = `${uri}/contracts/party-relationships/exists`;

    const requestOptions: any = getJsonOptions(uriAndPath, headerMap, json);

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