import {RepositoryKind} from "../../repository.kind";
import {AssetTypeStructureRepository} from "../../repository/asset.type.structure.repository";
import {properties} from "../../properties.helpers";
import {AssetTypeStructureRepositoryRestAdapter} from "./rest/asset.type.structure.repository.rest.adapter";
import {AssetTypeStructureRepositoryNeDbAdapter} from "./db/asset.type.structure.repository.db.adapter";

export function createAssetTypeStructureRepository(kind?: RepositoryKind): AssetTypeStructureRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetTypeStructureRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetTypeStructureRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Type Repository ${k}`);
  }

}