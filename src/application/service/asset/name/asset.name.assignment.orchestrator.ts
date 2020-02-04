import {AssetNameAssignment} from "../../../../domain/model/asset/asset.name.assignment";
import {Observable} from "rxjs";
import {AssetNameAssignmentDataProvider} from "../../../../port/asset.name.assignment.data.provider";
import {createAssetNameAssignmentDataProvider} from "../../../../infrastructure/asset/asset.name.assignment.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetNameAssignmentOrchestrator {

  private assetNameAssignmentRepository: AssetNameAssignmentDataProvider;

  constructor(options?: any) {
    this.assetNameAssignmentRepository = createAssetNameAssignmentDataProvider(options);
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