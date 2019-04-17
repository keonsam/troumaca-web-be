import {AssetIdentifierAssignment} from "../data/asset/asset.identifier.assignment";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetIdentifierAssignmentRepository {

  addAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<AssetIdentifierAssignment>;

  updateAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<Affect>;

  deleteAssetIdentifierAssignment(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetIdentifierAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierAssignment[]>;

  getAssetIdentifierAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierAssignment[]>>;

  getAssetIdentifierAssignmentCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetIdentifierAssignmentById(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifierAssignment>;

}
