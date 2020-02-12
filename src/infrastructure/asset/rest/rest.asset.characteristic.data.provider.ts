import {AssetCharacteristicDataProvider} from "../../../port/asset.characteristic.data.provider";
import {AssetCharacteristic} from "../../../domain/model/asset/asset.characteristic";
import { Observable, of } from "rxjs";
import {Affect} from "../../../domain/model/affect";
// import {Page} from "../../../util/page";
// import {Sort} from "../../../util/sort";
import { CharacteristicType } from "../../../domain/model/asset/characteristic.type";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetCharacteristics } from "../../../domain/model/asset/asset.characteristics";
import { AssetCharacteristicRequest } from "../../../domain/model/asset/request/asset.characteristic.request";

export class RestAssetCharacteristicDataProvider implements AssetCharacteristicDataProvider {
  addAssetCharacteristic(assetCharacteristic: AssetCharacteristicRequest, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic> {
    return undefined;
  }

  deleteAssetCharacteristic(assetCharacteristicId: string,  headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findAssetCharacteristics( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristicById(assetCharacteristicId: string,  headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic> {
    return undefined;
  }

  // getAssetCharacteristicCount( headerOptions?: HeaderBaseOptions): Observable<number> {
  //   return undefined;
  // }

  getAssetCharacteristics(tab?: string, search?: string , selected?: string[], pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristics> {
    return undefined;
  }

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  getAssetCharacteristicTypes(headerOptions?: HeaderBaseOptions): Observable<CharacteristicType[]> {
    return undefined;
  }

  getAssetCharacteristicType(assetCharacteristicTypeId: string, headerOptions?: any): Observable<CharacteristicType> {
    return undefined;
  }
}
