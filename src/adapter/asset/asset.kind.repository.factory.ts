import {AssetKindRepository} from "../../repository/asset.kind.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetKindRepositoryNeDbAdapter} from "./asset.kind.repository.db.adapter";
import {AssetKindRepositoryRestAdapter} from "./asset.kind.repository.rest.adapter";

export function createAssetKindRepository(kind?: RepositoryKind): AssetKindRepository {
  const type: number = properties.get("assetKind.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetKindRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetKindRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Kind Repository Type ${k}`);
  }
}
