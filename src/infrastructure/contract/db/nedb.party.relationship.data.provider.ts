import {PartyRelationshipDataProvider} from "../../../port/party.relationship.data.provider";
import {Observable} from "rxjs";
import {PartyRelationship} from "../../../domain/model/contract/party.relationship";

export class PartyRelationshipRepositoryNeDbAdapter implements PartyRelationshipDataProvider {
  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship> {
    return undefined;
  }

}