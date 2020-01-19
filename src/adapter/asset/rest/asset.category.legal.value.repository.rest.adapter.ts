import {AssetCategoryLegalValueRepository} from "../../../repository/asset.category.legal.value.repository";
import {AssetCategoryLegalValue} from "../../../data/asset/asset.category.legal.value";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {AssetCategoryLegalValues} from "../../../data/asset/asset.category.legal.values";

export class AssetCategoryLegalValueRepositoryRestAdapter implements AssetCategoryLegalValueRepository {
  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return undefined;
  }

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string,  headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCategoryLegalValues( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]> {
    return undefined;
  }

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string,  headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return undefined;
  }

  getAssetCategoryLegalValueCount( headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetCategoryLegalValues( search: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValues> {
    return undefined;
  }

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect> {
    return undefined;
  }


}
