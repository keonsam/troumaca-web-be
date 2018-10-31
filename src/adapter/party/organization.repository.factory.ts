import {OrganizationRepository} from "../../repository/organization.repository";
import {RepositoryKind} from "../../repository.kind";
import {OrganizationDBRepository} from "./organization.db.repository";
import {OrganizationRestRepository} from "./organization.rest.repository";
import {properties} from "../../properties.helpers";

export function createOrganizationRepository(kind?: RepositoryKind): OrganizationRepository {
  const type: number = properties.get("party.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new OrganizationDBRepository();
    case RepositoryKind.Rest:
      return new OrganizationRestRepository();
    default:
      throw new Error(`Unknown Party Repository Type ${k}`);

  }
}
