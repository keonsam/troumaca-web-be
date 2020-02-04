import {Observable} from "rxjs";
import {PartyRelationshipDataProvider} from "../../../port/party.relationship.data.provider";
import {createPartyRelationshipDataProvider} from "../../../infrastructure/contract/party.relationship.data.provider.factory";
import {PartyRelationship} from "../../../domain/model/contract/party.relationship";

export class PartyRelationshipOrchestrator {

  private partyRelationshipRepository: PartyRelationshipDataProvider;

  constructor() {
    this.partyRelationshipRepository = createPartyRelationshipDataProvider();
  }

  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship> {
    return this.partyRelationshipRepository.getPartyRelationship(toPartyId, options);
  }

}
