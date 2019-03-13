import {AssetRoleType} from "../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetRoleTypeRepository {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType>;

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<Affect>;

  deleteAssetRoleType(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetRoleTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]>;

  getAssetRoleTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRoleType[]>>;

  getAssetRoleTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetRoleTypeById(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRoleType>;

}