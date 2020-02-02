import {RepositoryKind} from "../../repository.kind";
import {AssetBrandDataProvider} from "../../port/asset.brand.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetBrandDataProvider} from "./rest/rest.asset.brand.data.provider";
import {NedbAssetBrandDataProvider} from "./db/nedb.asset.brand.data.provider";

export function createAssetBrandDataProvider(kind?: RepositoryKind): AssetBrandDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetBrandDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetBrandDataProvider();
    default:
      throw new Error(`Unknown Asset Brand Data Provider ${k}`);
  }

}