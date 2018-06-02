import {Asset} from "./asset";
import {Observable} from "rxjs/Observable";

export interface AssetRepository {

  saveAsset(asset:Asset):Observable<Asset>;

  getAssets(pageNumber:number, pageSize:number, order:string):Observable<Asset[]>;

  getAssetCount():Observable<number>;

  getAssetById(assetId:string):Observable<Asset>;

  updateAsset(assetId:string, asset:Asset):Observable<number>;

  deleteAsset(assetId:string):Observable<number>;

}
