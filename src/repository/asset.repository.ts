import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { HeaderBaseOptions } from "../header.base.options";
import { Assets } from "../data/asset/assets";

export interface AssetRepository {

  addAsset(asset: Asset, headerOptions?: HeaderBaseOptions): Observable<Asset>;

  updateAsset(assetId: string, asset: Asset, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]>;

  getAssets(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<Assets>;

  // getAssetCount(ownerPartyId: string, headerOptions?: HeaderBaseOptions): Observable<number>;

  getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset>;

}
