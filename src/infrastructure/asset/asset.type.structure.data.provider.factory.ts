import {RepositoryKind} from "../../repository.kind";
import {AssetTypeStructureDataProvider} from "../../port/asset.type.structure.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetTypeStructureDataProvider} from "./rest/rest.asset.type.structure.data.provider";
import {NedbAssetTypeStructureDataProvider} from "./db/nedb.asset.type.structure.data.provider";

export function createAssetTypeStructureDataProvider(kind?: RepositoryKind): AssetTypeStructureDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetTypeStructureDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetTypeStructureDataProvider();
    default:
      throw new Error(`Unknown Asset Identifier Type Data Provider ${k}`);
  }

}