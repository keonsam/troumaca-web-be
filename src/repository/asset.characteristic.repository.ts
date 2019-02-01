import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";

export interface AssetCharacteristicRepository {

  findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristic[]>;

  getAssetCharacteristicCount(): Observable<number>;

  getAssetCharacteristicById(assetId: string): Observable<AssetCharacteristic>;

  deleteAssetCharacteristic(assetId: string): Observable<number>;
}
