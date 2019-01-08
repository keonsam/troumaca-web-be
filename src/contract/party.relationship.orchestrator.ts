import {Observable} from "rxjs";
import {PartyRelationshipRepository} from "../repository/party.relationship.repository";
import {createPartyRelationshipRepositoryFactory} from "../adapter/contract/party.relationship.repository.factory";
import {PartyRelationship} from "../data/contract/party.relationship";

export class PartyRelationshipOrchestrator {

  private partyRelationshipRepository: PartyRelationshipRepository;

  constructor() {
    this.partyRelationshipRepository = createPartyRelationshipRepositoryFactory();
  }

  getPartyRelationship(toPartyId: string, options?: any): Observable<PartyRelationship> {
    return this.partyRelationshipRepository.getPartyRelationship(toPartyId, options);
  }

}
