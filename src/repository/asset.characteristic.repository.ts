import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { CharacteristicType } from "../data/asset/characteristic.type";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetCharacteristics } from "../data/asset/asset.characteristics";
import { AssetCharacteristicRequest } from "../graphql/asset/dto/asset.characteristic.request";

export interface AssetCharacteristicRepository {

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
