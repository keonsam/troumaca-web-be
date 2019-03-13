import {AssetNameAssignment} from "../../data/asset/asset.name.assignment";
import {Observable} from "rxjs";
import {AssetNameAssignmentRepository} from "../../repository/asset.name.assignment.repository";
import {createAssetNameAssignmentRepository} from "../../adapter/asset/asset.name.assignment.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetNameAssignmentOrchestrator {

  private assetNameAssignmentRepository: AssetNameAssignmentRepository;

  constructor(options?: any) {
    this.assetNameAssignmentRepository = createAssetNameAssignmentRepository(options);
  }

  addAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<AssetNameAssignment> {
    return this.assetNameAssignmentRepository.addAssetNameAssignment(assetNameAssignment, headerOptions);
  }

  findAssetNameAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetNameAssignment[]> {
    return this.assetNameAssignmentRepository.findAssetNameAssignments(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetNameAssignments(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameAssignment[]>> {
    return this.assetNameAssignmentRepository.getAssetNameAssignments(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<Affect> {
    return this.assetNameAssignmentRepository.updateAssetNameAssignment(assetNameAssignment, headerOptions);
  }

  getAssetNameAssignmentById(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetNameAssignment> {
    return this.assetNameAssignmentRepository.getAssetNameAssignmentById(assetNameAssignmentId, ownerPartyId, headerOptions);
  }

  deleteAssetNameAssignment(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetNameAssignmentRepository.deleteAssetNameAssignment(assetNameAssignmentId, ownerPartyId, headerOptions);
  }

}