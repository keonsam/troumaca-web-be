import {AssetType} from "../../data/asset/asset.type";
import {Observable} from "rxjs";
import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {createAssetTypeRepository} from "../../adapter/asset/asset.type.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetTypeOrchestrator {

  private assetTypeRepository: AssetTypeRepository;

  constructor(options?: any) {
    this.assetTypeRepository = createAssetTypeRepository(options);
  }

  addAssetType(assetType: AssetType, headerOptions?: any): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType, headerOptions);
  }

  findAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypes(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetType[]>> {
    return this.assetTypeRepository.getAssetTypes(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetType(assetType: AssetType, headerOptions?: any): Observable<Affect> {
    return this.assetTypeRepository.updateAssetType(assetType, headerOptions);
  }

  getAssetTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetType> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId, ownerPartyId, headerOptions);
  }

}