import {Observable} from "rxjs/Observable";
import {AssetTypeClass} from "./asset.type.class";

export interface AssetTypeClassRepository {

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]>;

  getAssetTypeClasses(pageNumber:number, pageSize:number, order:string):Observable<AssetTypeClass[]>;

  getAssetTypeClassCount():Observable<number>;

  getAssetTypeClassById(assetTypeClassId:string):Observable<AssetTypeClass>;

  getAssetTypeClassByIds(assetTypeClassIds:string[]):Observable<AssetTypeClass[]>;

  saveAssetTypeClass(assetTypeClass:AssetTypeClass):Observable<AssetTypeClass>;

  deleteAssetTypeClass(assetTypeClassId:string):Observable<number>;

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass):Observable<number>;

}
