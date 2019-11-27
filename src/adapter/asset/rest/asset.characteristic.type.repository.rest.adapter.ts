import {AssetCharacteristicTypeRepository} from "../../../repository/asset.characteristic.type.repository";
import {CharacteristicType} from "../../../data/asset/characteristic.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {CharacteristicTypes} from "../../../data/asset/characteristic.types";

export class AssetCharacteristicTypeRepositoryRestAdapter implements AssetCharacteristicTypeRepository {

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
