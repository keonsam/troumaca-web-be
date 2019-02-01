import {AssetCategoryLegalValue} from "../data/asset/asset.category.legal.value";
import {Observable} from "rxjs";

export interface AssetCategoryLegalValueRepository {

  saveAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue): Observable<AssetCategoryLegalValue>;

}