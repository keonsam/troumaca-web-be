import {OrganizationDataProvider} from "../../port/organization.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbOrganizationDataProvider} from "./db/nedb.organization.data.provider";
import {RestOrganizationDataProvider} from "./rest/rest.organization.data.provider";
import {properties} from "../../properties.helpers";

export function createOrganizationRepository(kind?: RepositoryKind): OrganizationDataProvider {
  const type: number = properties.get("party.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbOrganizationDataProvider();
    case RepositoryKind.Rest:
      return new RestOrganizationDataProvider();
    default:
      throw new Error(`Unknown Party Data Provider ${k}`);

  }
}
