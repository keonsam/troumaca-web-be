import {AssetType} from "../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
// import {Sort} from "../util/sort";
import { AssetTypes } from "../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetTypeRequest } from "../domain/model/asset/request/asset.type.request";

export interface AssetTypeDataProvider {

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetType(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  getAssetTypes(tab: string, type: string, search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetTypes>;

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

}
