import { Asset } from "../data/asset/asset";
import { Observable } from "rxjs/Observable";

export interface AssetRepository {

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]>;

  getAssetCount(): Observable<number>;

  getAssetById(assetId: string): Observable<Asset>;

  saveAsset(asset: Asset): Observable<Asset>;

  updateAsset(assetId: string, asset: Asset): Observable<number>;

  deleteAsset(assetId: string): Observable<number>;

}
