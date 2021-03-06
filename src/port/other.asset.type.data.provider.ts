import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import {OtherAssetType} from "../domain/model/asset/other.asset.type";

export interface OtherAssetTypeDataProvider {

  addOtherAssetType(otherAssetType: OtherAssetType, headerOptions?: any): Observable<OtherAssetType>;

  updateOtherAssetType(otherAssetType: OtherAssetType, headerOptions?: any): Observable<Affect>;

  deleteOtherAssetType(otherAssetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findOtherAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<OtherAssetType[]>;

  getOtherAssetTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<OtherAssetType[]>>;

  getOtherAssetTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getOtherAssetTypeById(otherAssetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<OtherAssetType>;

}
