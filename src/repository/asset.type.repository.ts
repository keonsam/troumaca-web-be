import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import {OtherAssetType} from "../data/asset/other.asset.type";

export interface AssetTypeRepository {

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]>;

  getAssetTypeCount(): Observable<number>;

  getAssetTypeById(assetId: string): Observable<AssetType>;

  // saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType>;

  addOtherAssetType(otherAssetType: OtherAssetType, options?: any): Observable<OtherAssetType>;

  // updateAssetType(assetId: string, assetType: AssetType, values: Value[]): Observable<number>;

  deleteAssetType(assetId: string): Observable<number>;
}
