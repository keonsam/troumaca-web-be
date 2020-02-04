import {AssetCharacteristicTypeDataProvider} from "../../../port/asset.characteristic.type.data.provider";
import {CharacteristicType} from "../../../domain/model/asset/characteristic.type";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {CharacteristicTypes} from "../../../domain/model/asset/characteristic.types";

export class RestAssetCharacteristicTypeDataProvider implements AssetCharacteristicTypeDataProvider {

  getCharacteristicTypes(headerOptions?: any): Observable<CharacteristicTypes> {
    return undefined;
  }

  addAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<CharacteristicType> {
    return undefined;
  }

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<CharacteristicType[]> {
    return undefined;
  }

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<CharacteristicType> {
    return undefined;
  }

  getAssetCharacteristicTypeCount(): Observable<number> {
    return undefined;
  }

  updateAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}
