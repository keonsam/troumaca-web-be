import {AssetCharacteristicAssignmentDataProvider} from "../../../port/asset.characteristic.assignment.data.provider";
import {AssetCharacteristicAssignment} from "../../../domain/model/asset/asset.characteristic.assignment";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestAssetCharacteristicAssignmentDataProvider implements AssetCharacteristicAssignmentDataProvider {
  addAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<AssetCharacteristicAssignment> {
    return undefined;
  }

  updateAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  deleteAssetCharacteristicAssignment(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCharacteristicAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicAssignment[]> {
    return undefined;
  }

  getAssetCharacteristicAssignmentById(assetId: string): Observable<AssetCharacteristicAssignment> {
    return undefined;
  }

  getAssetCharacteristicAssignmentCount(): Observable<number> {
    return undefined;
  }

  getAssetCharacteristicAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristicAssignment[]>> {
    return undefined;
  }
}