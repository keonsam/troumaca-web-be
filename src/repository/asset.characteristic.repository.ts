import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetCharacteristicRepository {

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?:any): Observable<AssetCharacteristic>;

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?:any): Observable<Affect>;

  deleteAssetCharacteristic(assetCharacteristicId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect>;

  findAssetCharacteristics(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>>;

  getAssetCharacteristicCount(ownerPartyId: string, headerOptions?:any): Observable<number>;

  getAssetCharacteristicById(assetCharacteristicId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetCharacteristic>;

}
