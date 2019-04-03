import {AssetNameAssignmentRepository} from "../../../repository/asset.name.assignment.repository";
import {AssetNameAssignment} from "../../../data/asset/asset.name.assignment";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class AssetNameAssignmentRepositoryRestAdapter implements AssetNameAssignmentRepository {
  addAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<AssetNameAssignment> {
    return undefined;
  }

  updateAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  deleteAssetNameAssignment(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetNameAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetNameAssignment[]> {
    return undefined;
  }

  getAssetNameAssignmentById(assetId: string): Observable<AssetNameAssignment> {
    return undefined;
  }

  getAssetNameAssignmentCount(): Observable<number> {
    return undefined;
  }

  getAssetNameAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameAssignment[]>> {
    return undefined;
  }
}