import {Observable} from "rxjs/Observable";
import {AssetTypeClass} from "./asset.type.class";
import { AssetTypeClassResponse } from "./asset.type.class.response";
import { AssignedAttribute } from "../attribute/assigned.attribute";

export interface AssetTypeClassRepository {

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]>;

  getAssetTypeClasses(pageNumber:number, pageSize:number, order:string):Observable<AssetTypeClass[]>;

  getAssetTypeClassCount():Observable<number>;

  getAssetTypeClassById(assetTypeClassId:string):Observable<AssetTypeClassResponse>;

  saveAssetTypeClass(assetTypeClass:AssetTypeClass, assignedAttributes: AssignedAttribute[]):Observable<AssetTypeClass>;

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass, assignedAttributes: AssignedAttribute[]):Observable<number>;

  deleteAssetTypeClass(assetTypeClassId:string):Observable<number>;


}
