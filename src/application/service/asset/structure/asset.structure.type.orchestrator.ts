import {AssetStructureType} from "../../../../domain/model/asset/asset.structure.type";
import {Observable} from "rxjs";
import {AssetStructureTypeDataProvider} from "../../../../port/asset.structure.type.data.provider";
import {createAssetStructureTypeDataProvider} from "../../../../infrastructure/asset/asset.structure.type.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetStructureTypeOrchestrator {

  private assetStructureTypeRepository: AssetStructureTypeDataProvider;

  constructor(options?: any) {
    this.assetStructureTypeRepository = createAssetStructureTypeDataProvider(options);
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