import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {AssetCategoryLegalValue} from "../data/asset/asset.category.legal.value";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetCategoryLegalValueRepository {

  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<AssetCategoryLegalValue>;

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect>;

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetCategoryLegalValues(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]>;

  getAssetCategoryLegalValues(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCategoryLegalValue[]>>;

  getAssetCategoryLegalValueCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCategoryLegalValue>;

}