import {RepositoryKind} from "../../repository.kind";
import {AssetNameRepository} from "../../repository/asset.name.repository";
import {properties} from "../../properties.helpers";
import {AssetNameRepositoryRestAdapter} from "./rest/asset.name.repository.rest.adapter";
import {AssetNameRepositoryNeDbAdapter} from "./db/asset.name.repository.db.adapter";

export function createAssetNameRepository(kind?: RepositoryKind): AssetNameRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetNameRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetNameRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Name Repository ${k}`);
  }

}