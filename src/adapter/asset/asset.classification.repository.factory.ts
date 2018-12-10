import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetClassificationRepositoryRestAdapter} from "./asset.classification.repository.rest.adapter";
import {AssetClassificationRepository} from "../../repository/asset.classification.repository";
import {AssetClassificationRepositoryNeDbAdapter} from "./asset.classification.repository.db.adapter";


export function createAssetClassificationRepositoryFactory(kind?: RepositoryKind): AssetClassificationRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetClassificationRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetClassificationRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
