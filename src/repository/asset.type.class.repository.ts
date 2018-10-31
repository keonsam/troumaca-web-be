import {AssetTypeClass} from "../data/asset/asset.type.class";
import {AssetTypeClassResponse} from "../data/asset/asset.type.class.response";
import {AssignedAttribute} from "../data/asset/assigned.attribute";
import {Observable} from "rxjs";

export interface AssetTypeClassRepository {

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]>;

  getAssetTypeClasses(pageNumber: number, pageSize: number, order: string): Observable<AssetTypeClass[]>;

  getAssetTypeClassCount(): Observable<number>;

  getAssetTypeClassById(assetTypeClassId: string): Observable<AssetTypeClassResponse>;

  saveAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass>;

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number>;

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

}
