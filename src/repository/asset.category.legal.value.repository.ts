import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {AssetCategoryLegalValue} from "../data/asset/asset.category.legal.value";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import {AssetCategoryLegalValues} from "../data/asset/asset.category.legal.values";

export interface AssetCategoryLegalValueRepository {

  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<AssetCategoryLegalValue>;

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect>;

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string, headerOptions?: any): Observable<Affect>;

  findAssetCategoryLegalValues(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]>;

  getAssetCategoryLegalValues(search: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValues>;

  getAssetCategoryLegalValueCount(headerOptions?: any): Observable<number>;

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string,  headerOptions?: any): Observable<AssetCategoryLegalValue>;

}
