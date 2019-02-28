import { AssetNameType } from "../data/asset/asset.name.type";
import {Observable} from "rxjs";

export interface AssetNameTypeRepository {

  findAssetNameTypes(searchStr: string, pageSize: number, options: any): Observable<AssetNameType[]>;

  getAssetNameTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetNameType[]>;

  getAssetNameTypeCount(options: any): Observable<number>;

  getAssetNameTypeById(assetNameTypeId: string, options: any): Observable<AssetNameType>;

  saveAssetNameType(assetNameType: AssetNameType, options: any): Observable<AssetNameType>;

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, options: any): Observable<number>;

  deleteAssetNameType(assetNameTypeId: string, options: any): Observable<number>;

}
