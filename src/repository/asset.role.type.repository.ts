import {AssetRoleType} from "../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";

export interface AssetRoleTypeRepository {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?:any): Observable<AssetRoleType>;

  findAssetRoleTypes(searchStr: string, pageSize: number, headerOptions?:any): Observable<AssetRoleType[]>;

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string, headerOptions?:any): Observable<AssetRoleType[]>;

  getAssetRoleTypeCount(headerOptions?:any): Observable<number>;

  getAssetRoleTypeById(assetId: string, headerOptions?:any): Observable<AssetRoleType>;

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?:any): Observable<Affect>;

  deleteAssetRoleType(assetId: string, headerOptions?:any): Observable<Affect>;

}