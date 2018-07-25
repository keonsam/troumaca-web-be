import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import { AssetRepository } from "./asset.repository";
import { AssetRepositoryNeDbAdapter } from "./adapter/asset.repository.db.adapter";
import { AssetRepositoryRestAdapter } from "./adapter/asset.repository.rest.adapter";




export function createAssetRepositoryFactory(kind?:RepositoryKind):AssetRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
