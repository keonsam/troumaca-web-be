import {AssetCharacteristicType} from "../data/asset/asset.characteristic.type";
import {Observable} from "rxjs";

export interface AssetCharacteristicTypeRepository {

  findAssetCharacteristicTypes(searchStr: string, pageSize: number): Observable<AssetCharacteristicType[]>;

  getAssetCharacteristicTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristicType[]>;

  getAssetCharacteristicTypeCount(): Observable<number>;

  getAssetCharacteristicTypeById(assetId: string): Observable<AssetCharacteristicType>;

  deleteAssetCharacteristicType(assetId: string): Observable<number>;
}
