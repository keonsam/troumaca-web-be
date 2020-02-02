import {AssetTypeStructure} from "../../../../domain/model/asset/asset.type.structure";
import {Observable} from "rxjs";
import {AssetTypeStructureDataProvider} from "../../../../port/asset.type.structure.data.provider";
import {createAssetTypeStructureDataProvider} from "../../../../infrastructure/asset/asset.type.structure.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetTypeStructureOrchestrator {

  private assetTypeStructureRepository: AssetTypeStructureDataProvider;

  constructor(options?: any) {
    this.assetTypeStructureRepository = createAssetTypeStructureDataProvider(options);
  }

  addAssetTypeStructure(assetTypeStructure: AssetTypeStructure, headerOptions?: any): Observable<AssetTypeStructure> {
    return this.assetTypeStructureRepository.addAssetTypeStructure(assetTypeStructure, headerOptions);
  }

  findAssetTypeStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetTypeStructure[]> {
    return this.assetTypeStructureRepository.findAssetTypeStructures(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypeStructures(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetTypeStructure[]>> {
    return this.assetTypeStructureRepository.getAssetTypeStructures(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetTypeStructure(assetTypeStructure: AssetTypeStructure, headerOptions?: any): Observable<Affect> {
    return this.assetTypeStructureRepository.updateAssetTypeStructure(assetTypeStructure, headerOptions);
  }

  getAssetTypeStructureById(assetTypeStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetTypeStructure> {
    return this.assetTypeStructureRepository.getAssetTypeStructureById(assetTypeStructureId, ownerPartyId, headerOptions);
  }

  deleteAssetTypeStructure(assetTypeStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetTypeStructureRepository.deleteAssetTypeStructure(assetTypeStructureId, ownerPartyId, headerOptions);
  }

}