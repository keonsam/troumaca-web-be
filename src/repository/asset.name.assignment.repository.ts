import {AssetNameAssignment} from "../data/asset/asset.name.assignment";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetNameAssignmentRepository {

  addAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<AssetNameAssignment>;

  updateAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<Affect>;

  deleteAssetNameAssignment(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetNameAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetNameAssignment[]>;

  getAssetNameAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameAssignment[]>>;

  getAssetNameAssignmentCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetNameAssignmentById(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetNameAssignment>;

}
