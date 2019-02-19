import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";
import {AssetRoleTypeRepositoryDbAdapter} from "./asset.role.type.repository.db.adapter";
import {AssetRoleTypeRepositoryRestAdapter} from "./asset.role.type.repository.rest.adapter";


export function createAssetRoleTypeRepositoryFactory(kind?: RepositoryKind): AssetRoleTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetRoleTypeRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new AssetRoleTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Role Type Repository Type ${k}`);
  }
}
