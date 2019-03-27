import {AssetRoleType} from "../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetRoleTypeRepository {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType>;

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, headerOptions?: any): Observable<Affect>;

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?: any): Observable<Affect>;

  findAssetRoleTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]>;

  getAssetRoleTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRoleType[]>>;

  getAssetRoleTypeCount(headerOptions?: any): Observable<number>;

  getAssetRoleTypeById(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRoleType>;

}
