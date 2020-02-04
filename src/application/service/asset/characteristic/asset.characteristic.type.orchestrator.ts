import {Observable} from "rxjs";
import {Affect} from "../../../../domain/model/affect";
import {CharacteristicType} from "../../../../domain/model/asset/characteristic.type";
import {AssetCharacteristicTypeDataProvider} from "../../../../port/asset.characteristic.type.data.provider";
import {createAssetCharacteristicTypeDataProvider} from "../../../../infrastructure/asset/asset.characteristic.type.data.provider.factory";
import { CharacteristicTypes } from "../../../../domain/model/asset/characteristic.types";

export class AssetCharacteristicTypeOrchestrator {

  private assetCharacteristicTypeRepository: AssetCharacteristicTypeDataProvider;

  constructor(options?: any) {
    this.assetCharacteristicTypeRepository = createAssetCharacteristicTypeDataProvider(options);
  }

  getCharacteristicTypes(headerOptions?: any): Observable<CharacteristicTypes> {
    return this.assetCharacteristicTypeRepository.getCharacteristicTypes(headerOptions);
  }

  // OTHERS
  addAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<CharacteristicType> {
    return this.assetCharacteristicTypeRepository.addAssetCharacteristicType(assetCharacteristicType, headerOptions);
  }

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<CharacteristicType[]> {
    return this.assetCharacteristicTypeRepository.findAssetCharacteristicTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  updateAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<Affect> {
    return this.assetCharacteristicTypeRepository.updateAssetCharacteristicType(assetCharacteristicType, headerOptions);
  }

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<CharacteristicType> {
    return this.assetCharacteristicTypeRepository.getAssetCharacteristicTypeById(assetCharacteristicTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetCharacteristicTypeRepository.deleteAssetCharacteristicType(assetCharacteristicTypeId, ownerPartyId, headerOptions);
  }

}
