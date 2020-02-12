import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {PartyRelationshipDataProvider} from "../../port/party.relationship.data.provider";
import {PartyRelationshipRepositoryNeDbAdapter} from "./db/nedb.party.relationship.data.provider";
import {RestPartyRelationshipDataProvider} from "./rest/rest.party.relationship.data.provider";

export function createPartyRelationshipDataProvider(kind?: RepositoryKind): PartyRelationshipDataProvider {
  const type: number = properties.get("credential.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new PartyRelationshipRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new RestPartyRelationshipDataProvider();
    default:
      throw new Error(`Unknown Party Relationship Data Provider ${k}`);
  }
}
