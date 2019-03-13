import {RepositoryKind} from "../../repository.kind";
import {AssetStructureTypeRepository} from "../../repository/asset.structure.type.repository";
import {properties} from "../../properties.helpers";
import {AssetStructureTypeRepositoryRestAdapter} from "./rest/asset.structure.type.repository.rest.adapter";
import {AssetStructureTypeRepositoryNeDbAdapter} from "./db/asset.structure.type.repository.db.adapter";

export function createAssetStructureTypeRepository(kind?: RepositoryKind): AssetStructureTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetStructureTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetStructureTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Type Repository ${k}`);
  }

}