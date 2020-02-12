import {PartyAccessRoleDataProvider} from "../../port/party.access.role.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbPartyAccessRoleDataProvider} from "./db/nedb.party.access.role.data.provider";
import {RestPartyAccessRoleDataProvider} from "./rest/rest.party.access.role.data.provider";
import {properties} from "../../properties.helpers";

export function createPartyAccessRoleDataProvider(kind?: RepositoryKind): PartyAccessRoleDataProvider {
  const type: number = properties.get("party.access.role.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbPartyAccessRoleDataProvider();
    case RepositoryKind.Rest:
      return new RestPartyAccessRoleDataProvider();
    default:
      throw new Error(`Unknown Party Access Role Data Provider ${k}`);
  }
}
