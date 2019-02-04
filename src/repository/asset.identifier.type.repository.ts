import {AssetIdentifierType} from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetIdentifierTypeRepository {

  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?:any): Observable<AssetIdentifierType>;

  updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?:any): Observable<Affect>;

  deleteAssetIdentifierType(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect>;

  findAssetIdentifierTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierType[]>>;

  getAssetIdentifierTypeCount(ownerPartyId: string, headerOptions?:any): Observable<number>;

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetIdentifierType>;

}
