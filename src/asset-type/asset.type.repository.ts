import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";

export interface AssetTypeRepository {

  findAssetTypes(searchStr:string, pageSize:number): Observable<AssetType[]>;

  saveAssetType(assetType:AssetType):Observable<AssetType>;

  getAssetTypes(pageNumber:number, pageSize:number, order:string):Observable<AssetType[]>;

  getAssetTypeCount():Observable<number>;

  getAssetTypeById(assetId:string):Observable<AssetType>;

  getAssetTypeByIds(assetIds:string[]):Observable<AssetType[]>;

  updateAssetType(assetId:string, assetType:AssetType):Observable<number>;

  deleteAssetType(assetId:string):Observable<number>;
}
