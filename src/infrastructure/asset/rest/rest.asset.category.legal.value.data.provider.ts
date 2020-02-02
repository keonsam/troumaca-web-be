import {AssetCategoryLegalValueDataProvider} from "../../../port/asset.category.legal.value.data.provider";
import {AssetCategoryLegalValue} from "../../../domain/model/asset/asset.category.legal.value";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {AssetCategoryLegalValues} from "../../../domain/model/asset/asset.category.legal.values";

export class RestAssetCategoryLegalValueDataProvider implements AssetCategoryLegalValueDataProvider {
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
