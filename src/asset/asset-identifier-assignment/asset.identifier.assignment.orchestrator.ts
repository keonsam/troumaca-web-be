import {AssetIdentifierAssignment} from "../../data/asset/asset.identifier.assignment";
import {Observable} from "rxjs";
import {AssetIdentifierAssignmentRepository} from "../../repository/asset.identifier.assignment.repository";
import {createAssetIdentifierAssignmentRepository} from "../../adapter/asset/asset.identifier.assignment.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetIdentifierAssignmentOrchestrator {

  private assetIdentifierAssignmentRepository: AssetIdentifierAssignmentRepository;

  constructor(options?: any) {
    this.assetIdentifierAssignmentRepository = createAssetIdentifierAssignmentRepository(options);
  }

  addAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<AssetIdentifierAssignment> {
    return this.assetIdentifierAssignmentRepository.addAssetIdentifierAssignment(assetIdentifierAssignment, headerOptions);
  }

  findAssetIdentifierAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierAssignment[]> {
    return this.assetIdentifierAssignmentRepository.findAssetIdentifierAssignments(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetIdentifierAssignments(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierAssignment[]>> {
    return this.assetIdentifierAssignmentRepository.getAssetIdentifierAssignments(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<Affect> {
    return this.assetIdentifierAssignmentRepository.updateAssetIdentifierAssignment(assetIdentifierAssignment, headerOptions);
  }

  getAssetIdentifierAssignmentById(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifierAssignment> {
    return this.assetIdentifierAssignmentRepository.getAssetIdentifierAssignmentById(assetIdentifierAssignmentId, ownerPartyId, headerOptions);
  }

  deleteAssetIdentifierAssignment(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetIdentifierAssignmentRepository.deleteAssetIdentifierAssignment(assetIdentifierAssignmentId, ownerPartyId, headerOptions);
  }

}