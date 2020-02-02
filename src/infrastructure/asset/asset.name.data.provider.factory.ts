import {RepositoryKind} from "../../repository.kind";
import {AssetNameDataProvider} from "../../port/asset.name.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetNameDataProvider} from "./rest/rest.asset.name.data.provider";
import {NedbAssetNameDataProvider} from "./db/nedb.asset.name.data.provider";

export function createAssetNameDataProvider(kind?: RepositoryKind): AssetNameDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetNameDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetNameDataProvider();
    default:
      throw new Error(`Unknown Asset Name Data Provider ${k}`);
  }

}