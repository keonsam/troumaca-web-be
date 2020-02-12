import {RepositoryKind} from "../../repository.kind";
import {AssetCategoryLegalValueDataProvider} from "../../port/asset.category.legal.value.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetCategoryLegalValueDataProvider} from "./rest/rest.asset.category.legal.value.data.provider";
import {NedbAssetCategoryLegalValueDataProvider} from "./db/nedb.asset.category.legal.value.data.provider";

export function createAssetCategoryLegalValueDataProvider(kind?: RepositoryKind): AssetCategoryLegalValueDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetCategoryLegalValueDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetCategoryLegalValueDataProvider();
    default:
      throw new Error(`Unknown Category Legal Value Data Provider ${k}`);
  }

}