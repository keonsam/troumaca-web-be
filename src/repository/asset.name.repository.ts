import {AssetName} from "../data/asset/asset.name";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetNameRepository {

  addAssetName(assetName: AssetName, headerOptions?:any): Observable<AssetName>;

  updateAssetName(assetName: AssetName, headerOptions?:any): Observable<Affect>;

  deleteAssetName(assetNameId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect>;

  findAssetNames(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetName[]>;

  getAssetNames(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetName[]>>;

  getAssetNameCount(ownerPartyId: string, headerOptions?:any): Observable<number>;

  getAssetNameById(assetNameId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetName>;

}
