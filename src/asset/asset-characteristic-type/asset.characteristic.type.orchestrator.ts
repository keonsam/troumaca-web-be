import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {AssetCharacteristicType} from "../../data/asset/asset.characteristic.type";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";
import {AssetCharacteristicTypeRepository} from "../../repository/asset.characteristic.type.repository";
import {createAssetCharacteristicTypeRepository} from "../../adapter/asset/asset.characteristic.type.repository.factory";
import { AssetCharacteristicTypes } from "../../data/asset/asset.characteristic.types";

export class AssetCharacteristicTypeOrchestrator {

  private assetCharacteristicTypeRepository: AssetCharacteristicTypeRepository;

  constructor(options?: any) {
    this.assetCharacteristicTypeRepository = createAssetCharacteristicTypeRepository(options);
  }

  addAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<AssetCharacteristicType> {
    return this.assetCharacteristicTypeRepository.addAssetCharacteristicType(assetCharacteristicType, headerOptions);
  }

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicType[]> {
    return this.assetCharacteristicTypeRepository.findAssetCharacteristicTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetCharacteristicTypes(headerOptions?: any): Observable<AssetCharacteristicTypes> {
    return this.assetCharacteristicTypeRepository.getAssetCharacteristicTypes(headerOptions);
  }

  updateAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<Affect> {
    return this.assetCharacteristicTypeRepository.updateAssetCharacteristicType(assetCharacteristicType, headerOptions);
  }

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicType> {
    return this.assetCharacteristicTypeRepository.getAssetCharacteristicTypeById(assetCharacteristicTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetCharacteristicTypeRepository.deleteAssetCharacteristicType(assetCharacteristicTypeId, ownerPartyId, headerOptions);
  }

}
