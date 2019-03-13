import {AssetCharacteristicAssignment} from "../../data/asset/asset.characteristic.assignment";
import {Observable} from "rxjs";
import {AssetCharacteristicAssignmentRepository} from "../../repository/asset.characteristic.assignment.repository";
import {createAssetCharacteristicAssignmentRepository} from "../../adapter/asset/asset.characteristic.assignment.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetCharacteristicAssignmentOrchestrator {

  private assetCharacteristicAssignmentRepository: AssetCharacteristicAssignmentRepository;

  constructor(options?: any) {
    this.assetCharacteristicAssignmentRepository = createAssetCharacteristicAssignmentRepository(options);
  }

  addAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<AssetCharacteristicAssignment> {
    return this.assetCharacteristicAssignmentRepository.addAssetCharacteristicAssignment(assetCharacteristicAssignment, headerOptions);
  }

  findAssetCharacteristicAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicAssignment[]> {
    return this.assetCharacteristicAssignmentRepository.findAssetCharacteristicAssignments(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetCharacteristicAssignments(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristicAssignment[]>> {
    return this.assetCharacteristicAssignmentRepository.getAssetCharacteristicAssignments(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<Affect> {
    return this.assetCharacteristicAssignmentRepository.updateAssetCharacteristicAssignment(assetCharacteristicAssignment, headerOptions);
  }

  getAssetCharacteristicAssignmentById(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicAssignment> {
    return this.assetCharacteristicAssignmentRepository.getAssetCharacteristicAssignmentById(assetCharacteristicAssignmentId, ownerPartyId, headerOptions);
  }

  deleteAssetCharacteristicAssignment(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetCharacteristicAssignmentRepository.deleteAssetCharacteristicAssignment(assetCharacteristicAssignmentId, ownerPartyId, headerOptions);
  }

}