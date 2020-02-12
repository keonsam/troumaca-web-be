import {AssetCharacteristicAssignment} from "../domain/model/asset/asset.characteristic.assignment";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetCharacteristicAssignmentDataProvider {

  addAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<AssetCharacteristicAssignment>;

  updateAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<Affect>;

  deleteAssetCharacteristicAssignment(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetCharacteristicAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicAssignment[]>;

  getAssetCharacteristicAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristicAssignment[]>>;

  getAssetCharacteristicAssignmentCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetCharacteristicAssignmentById(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicAssignment>;

}
