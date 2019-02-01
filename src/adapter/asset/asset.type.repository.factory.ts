import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetTypeRepositoryNeDbAdapter} from "./db/asset.type.repository.db.adapter";
import {AssetTypeRepositoryRestAdapter} from "./rest/asset.type.repository.rest.adapter";

export function createAssetTypeRepository(kind?: RepositoryKind): AssetTypeRepository {
  const type: number = properties.get("asset.type.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Type Repository Type ${k}`);

  }
}
