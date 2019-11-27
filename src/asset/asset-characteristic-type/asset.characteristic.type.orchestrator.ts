import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {CharacteristicType} from "../../data/asset/characteristic.type";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";
import {AssetCharacteristicTypeRepository} from "../../repository/asset.characteristic.type.repository";
import {createAssetCharacteristicTypeRepository} from "../../adapter/asset/asset.characteristic.type.repository.factory";
import { CharacteristicTypes } from "../../data/asset/characteristic.types";

export class AssetCharacteristicTypeOrchestrator {

  private assetCharacteristicTypeRepository: AssetCharacteristicTypeRepository;

  constructor(options?: any) {
    this.assetCharacteristicTypeRepository = createAssetCharacteristicTypeRepository(options);
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
