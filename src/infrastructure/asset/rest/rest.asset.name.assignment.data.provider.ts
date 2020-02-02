import {AssetNameAssignmentDataProvider} from "../../../port/asset.name.assignment.data.provider";
import {AssetNameAssignment} from "../../../domain/model/asset/asset.name.assignment";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestAssetNameAssignmentDataProvider implements AssetNameAssignmentDataProvider {
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