import {AssetIdentifierAssignmentDataProvider} from "../../../port/asset.identifier.assignment.data.provider";
import {AssetIdentifierAssignment} from "../../../domain/model/asset/asset.identifier.assignment";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestAssetIdentifierAssignmentDataProvider implements AssetIdentifierAssignmentDataProvider {
  addAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<AssetIdentifierAssignment> {
    return undefined;
  }

  updateAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  deleteAssetIdentifierAssignment(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetIdentifierAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierAssignment[]> {
    return undefined;
  }

  getAssetIdentifierAssignmentById(assetId: string): Observable<AssetIdentifierAssignment> {
    return undefined;
  }

  getAssetIdentifierAssignmentCount(): Observable<number> {
    return undefined;
  }

  getAssetIdentifierAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierAssignment[]>> {
    return undefined;
  }
}