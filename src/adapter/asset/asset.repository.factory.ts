import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetRepository} from "../../repository/asset.repository";
import {AssetRepositoryNeDbAdapter} from "./db/asset.repository.db.adapter";
import {AssetRepositoryRestAdapter} from "./rest/asset.repository.rest.adapter";


export function createAssetRepository(kind?: RepositoryKind): AssetRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Repository Type ${k}`);
  }
}
