import {RepositoryKind} from "../../repository.kind";
import {AssetRoleRepository} from "../../repository/asset.role.repository";
import {properties} from "../../properties.helpers";
import {AssetRoleRepositoryRestAdapter} from "./rest/asset.role.repository.rest.adapter";
import {AssetRoleRepositoryNeDbAdapter} from "./db/asset.role.repository.db.adapter";

export function createAssetRoleRepository(kind?: RepositoryKind): AssetRoleRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetRoleRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetRoleRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Role Repository ${k}`);
  }

}