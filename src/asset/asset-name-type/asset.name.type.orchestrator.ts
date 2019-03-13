import {Observable} from "rxjs";
import {AssetNameTypeRepository} from "../../repository/asset.name.type.repository";
import {createAssetNameTypeRepository} from "../../adapter/asset/asset.name.type.repository.factory";
import {Affect} from "../../data/affect";
import {AssetNameType} from "../../data/asset/asset.name.type";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetNameTypeOrchestrator {

  private assetNameTypeRepository: AssetNameTypeRepository;

  constructor(options?: any) {
    this.assetNameTypeRepository = createAssetNameTypeRepository(options);
  }

  addAssetNameType(assetNameType: AssetNameType, headerOptions?:any): Observable<AssetNameType> {
    return this.assetNameTypeRepository.addAssetNameType(assetNameType, headerOptions);
  }

  findAssetNameTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetNameType[]> {
    return this.assetNameTypeRepository.findAssetNameTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetNameTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameType[]>> {
    return this.assetNameTypeRepository.getAssetNameTypes(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateAssetNameType(assetNameType: AssetNameType, headerOptions?:any): Observable<Affect> {
    return this.assetNameTypeRepository.updateAssetNameType(assetNameType, headerOptions);
  }

  getAssetNameTypeById(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetNameType> {
    return this.assetNameTypeRepository.getAssetNameTypeById(assetNameTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetNameType(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId, ownerPartyId, headerOptions);
  }

}