import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import { Observable, of } from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import { AssetCharacteristicType } from "../../../data/asset/asset.characteristic.type";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetCharacteristics } from "../../../data/asset/asset.characteristics";
import { AssetCharacteristicInput } from "../../../graphql/asset/dto/asset.characteristic.input";

export class AssetCharacteristicRepositoryRestAdapter implements AssetCharacteristicRepository {
  addAssetCharacteristic(assetCharacteristic: AssetCharacteristicInput, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic> {
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

  getAssetCharacteristics(search?: string , selected?: [string], headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristics> {
    return undefined;
  }

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  getAssetCharacteristicTypes(headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristicType[]> {
    return undefined;
  }

  getAssetCharacteristicType(assetCharacteristicTypeId: string, headerOptions?: any): Observable<AssetCharacteristicType> {
    return undefined;
  }
}
