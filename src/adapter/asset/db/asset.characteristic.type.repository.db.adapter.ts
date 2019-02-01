import {AssetCharacteristicTypeRepository} from "../../../repository/asset.characteristic.type.repository";
import {AssetCharacteristicType} from "../../../data/asset/asset.characteristic.type";
import {Observable} from "rxjs";

export class AssetCharacteristicTypeRepositoryNeDbAdapter implements AssetCharacteristicTypeRepository {
  deleteAssetCharacteristicType(assetId: string): Observable<number> {
    return undefined;
  }

  findAssetCharacteristicTypes(searchStr: string, pageSize: number): Observable<AssetCharacteristicType[]> {
    return undefined;
  }

  getAssetCharacteristicTypeById(assetId: string): Observable<AssetCharacteristicType> {
    return undefined;
  }

  getAssetCharacteristicTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetCharacteristicTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristicType[]> {
    return undefined;
  }

}