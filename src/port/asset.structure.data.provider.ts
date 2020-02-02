import {AssetStructure} from "../domain/model/asset/asset.structure";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetStructureDataProvider {

  addAssetStructure(assetType: AssetStructure, headerOptions?: any): Observable<AssetStructure>;

  updateAssetStructure(assetType: AssetStructure, headerOptions?: any): Observable<Affect>;

  deleteAssetStructure(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructure[]>;

  getAssetStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructure[]>>;

  getAssetStructureCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetStructureById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructure>;

}
