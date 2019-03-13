import {RepositoryKind} from "../../repository.kind";
import {AssetIdentifierRepository} from "../../repository/asset.identifier.repository";
import {properties} from "../../properties.helpers";
import {AssetIdentifierRepositoryRestAdapter} from "./rest/asset.identifier.repository.rest.adapter";
import {AssetIdentifierRepositoryNeDbAdapter} from "./db/asset.identifier.repository.db.adapter";

export function createAssetIdentifierRepository(kind?: RepositoryKind): AssetIdentifierRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetIdentifierRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetIdentifierRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Repository ${k}`);
  }

}