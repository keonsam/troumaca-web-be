import { AssetCharacteristic } from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";

export interface AssetCharacteristicRepository {

  findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristic[]>;

  getAssetCharacteristicCount(): Observable<number>;

  getTypes(): Observable<any[]>;

  getAssetCharacteristicById(assetCharacteristicId: string): Observable<AssetCharacteristic>;

  saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic>;

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic): Observable<number>;

  deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number>;

}
