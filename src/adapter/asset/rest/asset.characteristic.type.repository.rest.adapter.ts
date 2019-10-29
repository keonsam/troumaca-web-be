import {AssetCharacteristicTypeRepository} from "../../../repository/asset.characteristic.type.repository";
import {AssetCharacteristicType} from "../../../data/asset/asset.characteristic.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetCharacteristicTypeRepositoryRestAdapter implements AssetCharacteristicTypeRepository {
  addAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<AssetCharacteristicType> {
    return undefined;
  }

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicType[]> {
    return undefined;
  }

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicType> {
    return undefined;
  }

  getAssetCharacteristicTypeCount(): Observable<number> {
    return undefined;
  }

  // getAssetCharacteristicTypes(headerOptions?: any): Observable<Page<AssetCharacteristicType[]>> {
  //   return undefined;
  // }

  updateAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}
