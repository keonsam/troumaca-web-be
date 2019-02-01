import {AssetCategoryLegalValueRepository} from "../../../repository/asset.category.legal.value.repository";
import {AssetCategoryLegalValue} from "../../../data/asset/asset.category.legal.value";
import {Observable} from "rxjs";

export class AssetCategoryLegalValueRepositoryRestAdapter implements AssetCategoryLegalValueRepository {
  saveAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue): Observable<AssetCategoryLegalValue> {
    return undefined;
  }

}