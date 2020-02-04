import {Observable} from "rxjs";
import {PartyRelationship} from "../domain/model/contract/party.relationship";

export interface PartyRelationshipDataProvider {
  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship>;
}