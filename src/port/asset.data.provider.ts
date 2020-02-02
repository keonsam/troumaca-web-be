import {Asset} from "../domain/model/asset/asset";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
// import {Sort} from "../util/sort";
// import {Page} from "../util/page";
import { HeaderBaseOptions } from "../header.base.options";
import { Assets } from "../domain/model/asset/assets";
import { AssetRequest } from "../domain/model/asset/request/asset.request";

export interface AssetDataProvider {

  addAsset(asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Asset>;

  updateAsset(assetId: string, asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]>;

  getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets>;

  // getAssetCount(ownerPartyId: string, headerOptions?: HeaderBaseOptions): Observable<number>;

  getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset>;

}
