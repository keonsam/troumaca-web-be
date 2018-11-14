import {AssetType} from "../data/asset/asset.type";
import {Value} from "../data/asset/value";
import {Observable} from "rxjs";

export interface AssetTypeRepository {

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]>;

  getAssetTypeCount(): Observable<number>;

  getAssetTypeById(assetId: string): Observable<AssetType>;

  saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType>;

  updateAssetType(assetId: string, assetType: AssetType, values: Value[]): Observable<number>;

  deleteAssetType(assetId: string): Observable<number>;
}
