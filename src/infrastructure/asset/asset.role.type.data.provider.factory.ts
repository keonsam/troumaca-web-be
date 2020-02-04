import {RepositoryKind} from "../../repository.kind";
import {AssetRoleTypeDataProvider} from "../../port/asset.role.type.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetRoleTypeDataProvider} from "./rest/rest.asset.role.type.data.provider";
import {NedbAssetRoleTypeDataProvider} from "./db/nedb.asset.role.type.data.provider";

export function createAssetRoleTypeDataProvider(kind?: RepositoryKind): AssetRoleTypeDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetRoleTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetRoleTypeDataProvider();
    default:
      throw new Error(`Unknown Asset Role Type Data Provider ${k}`);
  }

}