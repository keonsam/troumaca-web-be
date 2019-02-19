import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetIdentifierTypeRepository} from "../../repository/asset.identifier.type.repository";
import {AssetIdentifierTypeRepositoryDbAdapter} from "./asset.identifier.type.repository.db.adapter";
import {AssetIdentifierTypeRepositoryRestAdapter} from "./asset.identifier.type.repository.rest.adapter";


export function createAssetIdentifierTypeRepositoryFactory(kind?: RepositoryKind): AssetIdentifierTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetIdentifierTypeRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new AssetIdentifierTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Type Repository Type ${k}`);
  }
}
