import {AssetNameType} from "../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetNameTypeRepository {

  addAssetNameType(assetNameType: AssetNameType, headerOptions?:any): Observable<AssetNameType>;

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, headerOptions?: any): Observable<number>;

  deleteAssetNameType(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetNameType[]>;

  getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameType[]>>;

  getAssetNameTypeCount(headerOptions?: any): Observable<number>;

  getAssetNameTypeById(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetNameType>;

}
