import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { AssetCharacteristicType } from "../data/asset/asset.characteristic.type";

export interface AssetCharacteristicRepository {

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<AssetCharacteristic>;

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<Affect>;

  deleteAssetCharacteristic(assetCharacteristicId: string, headerOptions?: any): Observable<Affect>;

  findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>>;

  getAssetCharacteristicCount(headerOptions?: any): Observable<number>;

  getAssetCharacteristicById(assetCharacteristicId: string, headerOptions?: any): Observable<AssetCharacteristic>;

  getAssetCharacteristicTypes(options?: any): Observable<AssetCharacteristicType[]>;

  getAssetCharacteristicType(assetCharacteristicTypeId: string, options?: any): Observable<AssetCharacteristicType>;
}
