import {AssetRole} from "../data/asset/asset.role";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetRoleRepository {

  addAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<AssetRole>;

  updateAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<Affect>;

  deleteAssetRole(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetRoles(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRole[]>;

  getAssetRoles(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRole[]>>;

  getAssetRoleCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetRoleById(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRole>;

}