import {RepositoryKind} from "../../repository.kind";
import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";
import {properties} from "../../properties.helpers";
import {AssetRoleTypeRepositoryRestAdapter} from "./rest/asset.role.type.repository.rest.adapter";
import {AssetRoleTypeRepositoryNeDbAdapter} from "./db/asset.role.type.repository.db.adapter";

export function createAssetRoleTypeRepository(kind?: RepositoryKind): AssetRoleTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetRoleTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetRoleTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Role Type Repository ${k}`);
  }

}