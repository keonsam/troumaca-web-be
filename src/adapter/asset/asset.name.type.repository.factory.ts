import {RepositoryKind} from "../../repository.kind";
import {AssetNameTypeRepository} from "../../repository/asset.name.type.repository";
import {properties} from "../../properties.helpers";
import {AssetNameTypeRepositoryRestAdapter} from "./rest/asset.name.type.repository.rest.adapter";
import {AssetNameTypeRepositoryNeDbAdapter} from "./db/asset.name.type.repository.db.adapter";

export function createAssetNameTypeRepository(kind?: RepositoryKind): AssetNameTypeRepository {
  const type: number = properties.get("assetName.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetNameTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetNameTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Name Type Repository ${k}`);
  }

}
