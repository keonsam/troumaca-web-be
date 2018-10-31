import {PartyAccessRoleRepository} from "../../repository/party.access.role.repository";
import {RepositoryKind} from "../../repository.kind";
import {PartyAccessRoleDBRepository} from "./party.access.role.db.repository";
import {PartyAccessRoleRestRepository} from "./party.access.role.rest.repository";
import {properties} from "../../properties.helpers";

export function createPartyAccessRoleRepositoryFactory(kind?: RepositoryKind): PartyAccessRoleRepository {
  const type: number = properties.get("party.access.role.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new PartyAccessRoleDBRepository();
    case RepositoryKind.Rest:
      return new PartyAccessRoleRestRepository();
    default:
      throw new Error(`Unknown Party Access Role Repository Type ${k}`);
  }
}
