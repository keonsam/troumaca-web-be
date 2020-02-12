import {RepositoryKind} from "../../repository.kind";
import {AssetIdentifierDataProvider} from "../../port/asset.identifier.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetIdentifierDataProvider} from "./rest/rest.asset.identifier.data.provider";
import {NedbAssetIdentifierDataProvider} from "./db/nedb.asset.identifier.data.provider";

export function createAssetIdentifierDataProvider(kind?: RepositoryKind): AssetIdentifierDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetIdentifierDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetIdentifierDataProvider();
    default:
      throw new Error(`Unknown Asset Identifier Data Provider ${k}`);
  }

}