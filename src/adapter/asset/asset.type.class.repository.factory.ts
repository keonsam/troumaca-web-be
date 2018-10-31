import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetTypeClassRepositoryRestAdapter} from "./asset.type.class.repository.rest.adapter";
import {AssetTypeClassRepository} from "../../repository/asset.type.class.repository";
import {AssetTypeClassRepositoryNeDbAdapter} from "./asset.type.class.repository.db.adapter";


export function createAssetTypeClassRepositoryFactory(kind?: RepositoryKind): AssetTypeClassRepository {
  const type: number = properties.get("assetType.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetTypeClassRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetTypeClassRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
