import {AssetType} from "../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
// import {Sort} from "../util/sort";
// import { AssetTypes } from "../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetTypeRequest } from "../domain/model/asset/request/asset.type.request";

export interface AssetTypeDataProvider {

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  getAssetTypes(pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  deleteAssetType(assetTypeId: string, version: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect>;

}
