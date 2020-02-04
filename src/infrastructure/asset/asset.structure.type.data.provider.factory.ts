import {RepositoryKind} from "../../repository.kind";
import {AssetStructureTypeDataProvider} from "../../port/asset.structure.type.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetStructureTypeDataProvider} from "./rest/rest.asset.structure.type.data.provider";
import {NedbAssetStructureTypeDataProvider} from "./db/nedb.asset.structure.type.data.provider";

export function createAssetStructureTypeDataProvider(kind?: RepositoryKind): AssetStructureTypeDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetStructureTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetStructureTypeDataProvider();
    default:
      throw new Error(`Unknown Asset Identifier Type Data Provider ${k}`);
  }

}