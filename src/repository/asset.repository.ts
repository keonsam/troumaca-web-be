import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetRepository {

  addAsset(asset: Asset, headerOptions?: any): Observable<Asset>;

  updateAsset(asset: Asset, headerOptions?: any): Observable<Affect>;

  deleteAsset(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssets(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<Asset[]>;

  getAssets(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<Asset[]>>;

  getAssetCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetById(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Asset>;

}
