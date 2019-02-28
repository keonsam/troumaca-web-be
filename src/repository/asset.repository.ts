import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";

export interface AssetRepository {

  findAssets(searchStr: string, pageSize: number, options: any): Observable<Asset[]>;

  getAssets(pageNumber: number, pageSize: number, order: string, options: any): Observable<Asset[]>;

  getAssetCount(options: any): Observable<number>;

  getAssetById(assetId: string, options: any): Observable<Asset>;

  saveAsset(asset: Asset, options: any): Observable<Asset>;

  updateAsset(assetId: string, asset: Asset, options: any): Observable<number>;

  deleteAsset(assetId: string, options: any): Observable<number>;

}
