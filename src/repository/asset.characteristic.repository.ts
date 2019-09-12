import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { AssetCharacteristicType } from "../data/asset/asset.characteristic.type";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetCharacteristics } from "../data/asset/asset.characteristics";
import { AssetCharacteristicInput } from "../graphql/asset/dto/asset.characteristic.input";

export interface AssetCharacteristicRepository {

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristicInput, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic>;

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetCharacteristic(assetCharacteristicId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristics>;

  // getAssetCharacteristicCount(headerOptions?: HeaderBaseOptions): Observable<number>;

  getAssetCharacteristicById(assetCharacteristicId: string, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic>;

  getAssetCharacteristicTypes(headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristicType[]>;

  getAssetCharacteristicType(assetCharacteristicTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristicType>;
}
