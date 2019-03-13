import {AssetNameType} from "../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetNameTypeRepository {

  addAssetNameType(assetNameType: AssetNameType, headerOptions?:any): Observable<AssetNameType>;

  updateAssetNameType(assetNameType: AssetNameType, headerOptions?:any): Observable<Affect>;

  deleteAssetNameType(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect>;

  findAssetNameTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetNameType[]>;

  getAssetNameTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameType[]>>;

  getAssetNameTypeCount(ownerPartyId: string, headerOptions?:any): Observable<number>;

  getAssetNameTypeById(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetNameType>;

}
