import {AssetIdentifierAssignment} from "../../../../domain/model/asset/asset.identifier.assignment";
import {Observable} from "rxjs";
import {AssetIdentifierAssignmentDataProvider} from "../../../../port/asset.identifier.assignment.data.provider";
import {createAssetIdentifierAssignmentDataProvider} from "../../../../infrastructure/asset/asset.identifier.assignment.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetIdentifierAssignmentOrchestrator {

  private assetIdentifierAssignmentRepository: AssetIdentifierAssignmentDataProvider;

  constructor(options?: any) {
    this.assetIdentifierAssignmentRepository = createAssetIdentifierAssignmentDataProvider(options);
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