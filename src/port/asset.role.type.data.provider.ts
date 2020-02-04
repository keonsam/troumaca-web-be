import {AssetRoleType} from "../domain/model/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetRoleTypes } from "../domain/model/asset/asset.role.types";

export interface AssetRoleTypeDataProvider {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType>;

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetRoleTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType[]>;

  getAssetRoleTypes(search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetRoleTypes>;

  // getAssetRoleTypeCount(headerOptions?: HeaderBaseOptions): Observable<number>;

  getAssetRoleTypeById(assetRoleTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType>;
}
