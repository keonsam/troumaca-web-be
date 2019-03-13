import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetTypeRepository {

  addAssetType(assetType: AssetType, headerOptions?: any): Observable<AssetType>;

  updateAssetType(assetType: AssetType, headerOptions?: any): Observable<Affect>;

  deleteAssetType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]>;

  getAssetTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetType[]>>;

  getAssetTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetType>;

}
