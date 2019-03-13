import {RepositoryKind} from "../../repository.kind";
import {AssetStructureRepository} from "../../repository/asset.structure.repository";
import {properties} from "../../properties.helpers";
import {AssetStructureRepositoryRestAdapter} from "./rest/asset.structure.repository.rest.adapter";
import {AssetStructureRepositoryNeDbAdapter} from "./db/asset.structure.repository.db.adapter";

export function createAssetStructureRepository(kind?: RepositoryKind): AssetStructureRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetStructureRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetStructureRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Type Repository ${k}`);
  }

}