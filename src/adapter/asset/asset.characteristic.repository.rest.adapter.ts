import { AssetCharacteristicRepository } from "../../repository/asset.characteristic.repository";
import { AssetCharacteristic} from "../../data/asset/asset.characteristic";
import { Observable } from "rxjs";

export class AssetCharacteristicRepositoryRestAdapter implements AssetCharacteristicRepository {

  constructor() {
  }

  findAssetCharacteristics(searchStr: string, pageSize: number, options: any): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristics(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetCharacteristic[]> {
    return undefined;
  }

  getAssetCharacteristicCount(options: any): Observable<number> {
    return undefined;
  }

  getTypes(options: any): Observable<any[]> {
    return undefined;
  }

  getAssetCharacteristicById(assetCharacteristicId: string, options: any): Observable<AssetCharacteristic> {
    return undefined;
  }

  saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic, options: any): Observable<AssetCharacteristic> {
    return undefined;
  }

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, options: any): Observable<number> {
    return undefined;
  }

  deleteAssetCharacteristic(assetCharacteristicId: string, options: any): Observable<number> {
    return undefined;
  }

}
