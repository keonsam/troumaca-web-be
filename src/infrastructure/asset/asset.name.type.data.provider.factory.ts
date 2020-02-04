import {RepositoryKind} from "../../repository.kind";
import {AssetNameTypeDataProvider} from "../../port/asset.name.type.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetNameTypeDataProvider} from "./rest/rest.asset.name.type.data.provider";
import {NedbAssetNameTypeDataProvider} from "./db/nedb.asset.name.type.data.provider";

export function createAssetNameTypeDataProvider(kind?: RepositoryKind): AssetNameTypeDataProvider {
  const type: number = properties.get("assetName.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetNameTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetNameTypeDataProvider();
    default:
      throw new Error(`Unknown Asset Name Type Data Provider ${k}`);
  }

}
