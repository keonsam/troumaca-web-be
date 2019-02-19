import { AssetCharacteristicRepository } from "../../repository/asset.characteristic.repository";
import { AssetCharacteristic} from "../../data/asset/asset.characteristic";
import { Observable } from "rxjs";

export class AssetCharacteristicRepositoryRestAdapter implements AssetCharacteristicRepository {

  constructor() {
  }

  findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristicCount(): Observable<number> {
    return undefined;
  }

  getTypes(): Observable<any[]> {
    return undefined;
  }

  getAssetCharacteristicById(assetCharacteristicId: string): Observable<AssetCharacteristic> {
    return undefined;
  }

  saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
    return undefined;
  }

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic): Observable<number> {
    return undefined;
  }

  deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
    return undefined;
  }

}
