import {RepositoryKind} from "../../repository.kind";
import {AssetRoleDataProvider} from "../../port/asset.role.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetRoleDataProvider} from "./rest/rest.asset.role.data.provider";
import {NedbAssetRoleDataProvider} from "./db/nedb.asset.role.data.provider";

export function createAssetRoleDataProvider(kind?: RepositoryKind): AssetRoleDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetRoleDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetRoleDataProvider();
    default:
      throw new Error(`Unknown Asset Role Data Provider ${k}`);
  }

}