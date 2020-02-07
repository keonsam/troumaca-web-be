import {AssetTypeDataProvider} from "../../../port/asset.type.data.provider";
import {RepositoryKind} from "../../../repository.kind";
import {properties} from "../../../properties.helpers";
import {NedbAssetTypeDataProvider} from "./db/nedb.asset.type.data.provider";
import {RestAssetTypeDataProvider} from "./rest/rest.asset.type.data.provider";

export function createAssetTypeDataProvider(kind?: RepositoryKind): AssetTypeDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetTypeDataProvider();
    case RepositoryKind.Rest:
      const uri: string = properties.get("asset.host.port") as string;
      return new RestAssetTypeDataProvider(uri);
    default:
      throw new Error(`Unknown Asset Type Data Provider ${k}`);
  }

}
