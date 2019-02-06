import { AssetRoleType } from "../data/asset/asset.role.type";
import {Observable} from "rxjs";

export interface AssetRoleTypeRepository {

  findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]>;

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetRoleType[]>;

  getAssetRoleTypeCount(): Observable<number>;

  getAssetRoleTypeById(assetRoleTypeId: string): Observable<AssetRoleType>;

  saveAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType>;

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType): Observable<number>;

  deleteAssetRoleType(assetRoleTypeId: string): Observable<number>;

}
