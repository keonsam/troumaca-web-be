import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {AssetStructure} from "../../data/asset/asset.structure";
import {AssetStructureRepository} from "../../repository/asset.structure.repository";
import {createAssetStructureRepository} from "../../adapter/asset/asset.structure.repository.factory";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetStructureOrchestrator {

  private assetStructureRepository: AssetStructureRepository;

  constructor(options?: any) {
    this.assetStructureRepository = createAssetStructureRepository(options);
  }

  addAssetStructure(assetStructure: AssetStructure, headerOptions?:any): Observable<AssetStructure> {
    return this.assetStructureRepository.addAssetStructure(assetStructure, headerOptions);
  }

  findAssetStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetStructure[]> {
    return this.assetStructureRepository.findAssetStructures(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructure[]>> {
    return this.assetStructureRepository.getAssetStructures(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateAssetStructure(assetStructure: AssetStructure, headerOptions?:any): Observable<Affect> {
    return this.assetStructureRepository.updateAssetStructure(assetStructure, headerOptions);
  }

  getAssetStructureById(assetStructureId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetStructure> {
    return this.assetStructureRepository.getAssetStructureById(assetStructureId, ownerPartyId, headerOptions);
  }

  deleteAssetStructure(assetStructureId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return this.assetStructureRepository.deleteAssetStructure(assetStructureId, ownerPartyId, headerOptions);
  }

}