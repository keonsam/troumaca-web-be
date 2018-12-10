import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {PartyRelationshipRepository} from "../../repository/party.relationship.repository";
import {PartyRelationshipRepositoryRestAdapter} from "./party.relationship.repository.rest.adapter";
import {PartyRelationshipRepositoryNeDbAdapter} from "./party.relationship.repository.db.adapter";

export function createPartyRelationshipRepositoryFactory(kind?: RepositoryKind): PartyRelationshipRepository {
  const type: number = properties.get("credential.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new PartyRelationshipRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new PartyRelationshipRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Party Relationship Repository Type ${k}`);
  }
}
