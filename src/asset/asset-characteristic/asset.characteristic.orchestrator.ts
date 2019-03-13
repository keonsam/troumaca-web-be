import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {AssetCharacteristic} from "../../data/asset/asset.characteristic";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";
import {AssetCharacteristicRepository} from "../../repository/asset.characteristic.repository";
import {createAssetCharacteristicRepository} from "../../adapter/asset/asset.characteristic.repository.factory";

export class AssetCharacteristicOrchestrator {

  private assetCharacteristicRepository: AssetCharacteristicRepository;

  constructor(options?: any) {
    this.assetCharacteristicRepository = createAssetCharacteristicRepository(options);
  }

  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?:any): Observable<AssetCharacteristic> {
    return this.assetCharacteristicRepository.addAssetCharacteristic(assetCharacteristic, headerOptions);
  }

  findAssetCharacteristics(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetCharacteristic[]> {
    return this.assetCharacteristicRepository.findAssetCharacteristics(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetCharacteristics(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>> {
    return this.assetCharacteristicRepository.getAssetCharacteristics(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?:any): Observable<Affect> {
    return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristic, headerOptions);
  }

  getAssetCharacteristicById(assetCharacteristicId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetCharacteristic> {
    return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId, ownerPartyId, headerOptions);
  }

  deleteAssetCharacteristic(assetCharacteristicId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId, ownerPartyId, headerOptions);
  }

}