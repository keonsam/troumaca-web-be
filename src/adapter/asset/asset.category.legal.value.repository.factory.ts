import {RepositoryKind} from "../../repository.kind";
import {AssetCategoryLegalValueRepository} from "../../repository/asset.category.legal.value.repository";
import {properties} from "../../properties.helpers";
import {AssetCategoryLegalValueRepositoryRestAdapter} from "./rest/asset.category.legal.value.repository.rest.adapter";
import {AssetCategoryLegalValueRepositoryNeDbAdapter} from "./db/asset.category.legal.value.repository.db.adapter";

export function createAssetCategoryLegalValueRepository(kind?: RepositoryKind): AssetCategoryLegalValueRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetCategoryLegalValueRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetCategoryLegalValueRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Category Legal Value ${k}`);
  }

}