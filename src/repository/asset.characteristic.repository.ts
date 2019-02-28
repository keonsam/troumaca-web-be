import { AssetCharacteristic } from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";

export interface AssetCharacteristicRepository {

  findAssetCharacteristics(searchStr: string, pageSize: number, options: any): Observable<AssetCharacteristic[]>;

  getAssetCharacteristics(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetCharacteristic[]>;

  getAssetCharacteristicCount(options: any): Observable<number>;

  getTypes(options: any): Observable<any[]>;

  getAssetCharacteristicById(assetCharacteristicId: string, options: any): Observable<AssetCharacteristic>;

  saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic, options: any): Observable<AssetCharacteristic>;

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, options: any): Observable<number>;

  deleteAssetCharacteristic(assetCharacteristicId: string, options: any): Observable<number>;

}
