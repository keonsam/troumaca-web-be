import {AccessRoleTypeDataProvider} from "../../port/access.role.type.data.provider";
import {RepositoryKind} from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { NedbAccessRoleTypeDataProvider } from "./db/nedb.access.role.type.data.provider";
import { RestAssetRoleTypeDataProvider } from "./rest/rest.asset.role.type.data.provider";

export function createAccessRoleTypeDataProvider(kind?: RepositoryKind): AccessRoleTypeDataProvider {
    const type: number = properties.get("access.role.type.data.provider.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAccessRoleTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetRoleTypeDataProvider();
    default:
      throw new Error(`Unknown Access Role Type Data Provider ${kind}`);
  }
}
