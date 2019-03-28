import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import { Observable, of } from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import { AssetCharacteristicType } from "../../../data/asset/asset.characteristic.type";

export class AssetCharacteristicRepositoryRestAdapter implements AssetCharacteristicRepository {
  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<AssetCharacteristic> {
    return undefined;
  }

  deleteAssetCharacteristic(assetCharacteristicId: string,  headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCharacteristics( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristicById(assetCharacteristicId: string,  headerOptions?: any): Observable<AssetCharacteristic> {
    return undefined;
  }

  getAssetCharacteristicCount( headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetCharacteristics( pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>> {
    return undefined;
  }

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  getAssetCharacteristicTypes(options?: any): Observable<AssetCharacteristicType[]> {
    return undefined;
  }

  getAssetCharacteristicType(assetCharacteristicTypeId: string, options?: any): Observable<AssetCharacteristicType> {
    return undefined;
  }
}
