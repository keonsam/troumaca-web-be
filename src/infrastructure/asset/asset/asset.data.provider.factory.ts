import {RepositoryKind} from "../../../repository.kind";
import {properties} from "../../../properties.helpers";
import {AssetDataProvider} from "../../../port/asset.data.provider";
import {NedbAssetDataProvider} from "./db/nedb.asset.data.provider";
import {RestAssetDataProvider} from "./rest/rest.asset.data.provider";


export function createAssetDataProvider(kind?: RepositoryKind): AssetDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetDataProvider();
    case RepositoryKind.Rest:
      const uri: string = properties.get("asset.host.port") as string;
      return new RestAssetDataProvider(uri);
    default:
      throw new Error(`Unknown Asset Data Provider ${k}`);
  }
}
