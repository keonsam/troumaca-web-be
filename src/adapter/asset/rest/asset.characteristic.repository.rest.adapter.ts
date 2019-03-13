import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetCharacteristicRepositoryRestAdapter implements AssetCharacteristicRepository {
  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<AssetCharacteristic> {
    return undefined;
  }

  deleteAssetCharacteristic(assetCharacteristicId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCharacteristics(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristicById(assetCharacteristicId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristic> {
    return undefined;
  }

  getAssetCharacteristicCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetCharacteristics(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>> {
    return undefined;
  }

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}