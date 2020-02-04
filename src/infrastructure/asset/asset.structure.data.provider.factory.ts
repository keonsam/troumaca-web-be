import {RepositoryKind} from "../../repository.kind";
import {AssetStructureDataProvider} from "../../port/asset.structure.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetStructureDataProvider} from "./rest/rest.asset.structure.data.provider";
import {NedbAssetStructureDataProvider} from "./db/nedb.asset.structure.data.provider";

export function createAssetStructureDataProvider(kind?: RepositoryKind): AssetStructureDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetStructureDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetStructureDataProvider();
    default:
      throw new Error(`Unknown Asset Identifier Type Data Provider ${k}`);
  }

}