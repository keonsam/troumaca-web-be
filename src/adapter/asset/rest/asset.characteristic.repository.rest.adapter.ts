import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import {Observable} from "rxjs";

export class AssetCharacteristicRepositoryRestAdapter implements AssetCharacteristicRepository {
  deleteAssetCharacteristic(assetId: string): Observable<number> {
    return undefined;
  }

  findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristicById(assetId: string): Observable<AssetCharacteristic> {
    return undefined;
  }

  getAssetCharacteristicCount(): Observable<number> {
    return undefined;
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristic[]> {
    return undefined;
  }
}