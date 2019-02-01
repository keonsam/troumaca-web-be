import {RepositoryKind} from "../../repository.kind";
import {AssetBrandRepository} from "../../repository/asset.brand.repository";
import {properties} from "../../properties.helpers";
import {AssetBrandRepositoryRestAdapter} from "./rest/asset.brand.repository.rest.adapter";
import {AssetBrandRepositoryNeDbAdapter} from "./db/asset.brand.repository.db.adapter";

export function createAssetBrandRepositoryFactory(kind?: RepositoryKind): AssetBrandRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetBrandRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetBrandRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Brand Repository ${k}`);
  }

}