import {PartyRelationshipRepository} from "../../repository/party.relationship.repository";
import {Observable} from "rxjs";
import {PartyRelationship} from "../../data/contract/party.relationship";

export class PartyRelationshipRepositoryNeDbAdapter implements PartyRelationshipRepository {
  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship> {
    return undefined;
  }

}