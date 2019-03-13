import {AssetStructureType} from "../../data/asset/asset.structure.type";
import {Observable} from "rxjs";
import {AssetStructureTypeRepository} from "../../repository/asset.structure.type.repository";
import {createAssetStructureTypeRepository} from "../../adapter/asset/asset.structure.type.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetStructureTypeOrchestrator {

  private assetStructureTypeRepository: AssetStructureTypeRepository;

  constructor(options?: any) {
    this.assetStructureTypeRepository = createAssetStructureTypeRepository(options);
  }

  addAssetStructureType(assetStructureType: AssetStructureType, headerOptions?: any): Observable<AssetStructureType> {
    return this.assetStructureTypeRepository.addAssetStructureType(assetStructureType, headerOptions);
  }

  findAssetStructureTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructureType[]> {
    return this.assetStructureTypeRepository.findAssetStructureTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetStructureTypes(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructureType[]>> {
    return this.assetStructureTypeRepository.getAssetStructureTypes(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetStructureType(assetStructureType: AssetStructureType, headerOptions?: any): Observable<Affect> {
    return this.assetStructureTypeRepository.updateAssetStructureType(assetStructureType, headerOptions);
  }

  getAssetStructureTypeById(assetStructureTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructureType> {
    return this.assetStructureTypeRepository.getAssetStructureTypeById(assetStructureTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetStructureType(assetStructureTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetStructureTypeRepository.deleteAssetStructureType(assetStructureTypeId, ownerPartyId, headerOptions);
  }

}