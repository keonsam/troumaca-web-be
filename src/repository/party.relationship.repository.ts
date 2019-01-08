import {Observable} from "rxjs";
import {PartyRelationship} from "../data/contract/party.relationship";

export interface PartyRelationshipRepository {
  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship>;
}