import {RepositoryKind} from "../../repository.kind";
import {AssetIdentifierTypeDataProvider} from "../../port/asset.identifier.type.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetIdentifierTypeDataProvider} from "./rest/rest.asset.identifier.type.data.provider";
import {NebdAssetIdentifierTypeDataProvider} from "./db/nedb.asset.identifier.type.data.provider";

export function createAssetIdentifierTypeDataProvider(kind?: RepositoryKind): AssetIdentifierTypeDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NebdAssetIdentifierTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetIdentifierTypeDataProvider();
    default:
      throw new Error(`Unknown Asset Identifier Type Repository ${k}`);
  }

}