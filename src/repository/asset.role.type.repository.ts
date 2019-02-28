import { AssetRoleType } from "../data/asset/asset.role.type";
import {Observable} from "rxjs";

export interface AssetRoleTypeRepository {

  findAssetRoleTypes(searchStr: string, pageSize: number, options: any): Observable<AssetRoleType[]>;

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetRoleType[]>;

  getAssetRoleTypeCount(options: any): Observable<number>;

  getAssetRoleTypeById(assetRoleTypeId: string, options: any): Observable<AssetRoleType>;

  saveAssetRoleType(assetRoleType: AssetRoleType, options: any): Observable<AssetRoleType>;

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, options: any): Observable<number>;

  deleteAssetRoleType(assetRoleTypeId: string, options: any): Observable<number>;

}
