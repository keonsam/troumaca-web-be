import {AssetCharacteristic} from "../domain/model/asset/asset.characteristic";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
// import {Sort} from "../util/sort";
// import {Page} from "../util/page";
import { CharacteristicType } from "../domain/model/asset/characteristic.type";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetCharacteristics } from "../domain/model/asset/asset.characteristics";
import { AssetCharacteristicRequest } from "../domain/model/asset/request/asset.characteristic.request";

export interface AssetCharacteristicDataProvider {

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristicRequest, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic>;

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetCharacteristic(assetCharacteristicId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(tab?: string, search?: string, selected?: string[], pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristics>;

  // getAssetCharacteristicCount(headerOptions?: HeaderBaseOptions): Observable<number>;

  getAssetCharacteristicById(assetCharacteristicId: string, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic>;

  getAssetCharacteristicTypes(headerOptions?: HeaderBaseOptions): Observable<CharacteristicType[]>;

  getAssetCharacteristicType(assetCharacteristicTypeId: string, headerOptions?: HeaderBaseOptions): Observable<CharacteristicType>;
}
