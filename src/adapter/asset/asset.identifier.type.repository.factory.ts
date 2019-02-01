import {RepositoryKind} from "../../repository.kind";
import {AssetIdentifierTypeRepository} from "../../repository/asset.identifier.type.repository";
import {properties} from "../../properties.helpers";
import {AssetIdentifierTypeRepositoryRestAdapter} from "./rest/asset.identifier.type.repository.rest.adapter";
import {AssetIdentifierTypeRepositoryNeDbAdapter} from "./db/asset.identifier.type.repository.db.adapter";

export function createAssetIdentifierTypeRepositoryFactory(kind?: RepositoryKind): AssetIdentifierTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetIdentifierTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetIdentifierTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Type Repository ${k}`);
  }

}