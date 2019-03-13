import {AssetTypeStructure} from "../../data/asset/asset.type.structure";
import {Observable} from "rxjs";
import {AssetTypeStructureRepository} from "../../repository/asset.type.structure.repository";
import {createAssetTypeStructureRepository} from "../../adapter/asset/asset.type.structure.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetTypeStructureOrchestrator {

  private assetTypeStructureRepository: AssetTypeStructureRepository;

  constructor(options?: any) {
    this.assetTypeStructureRepository = createAssetTypeStructureRepository(options);
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