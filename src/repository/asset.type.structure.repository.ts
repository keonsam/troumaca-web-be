import {AssetTypeStructure} from "../data/asset/asset.type.structure";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetTypeStructureRepository {

  addAssetTypeStructure(assetType: AssetTypeStructure, headerOptions?: any): Observable<AssetTypeStructure>;

  updateAssetTypeStructure(assetType: AssetTypeStructure, headerOptions?: any): Observable<Affect>;

  deleteAssetTypeStructure(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetTypeStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetTypeStructure[]>;

  getAssetTypeStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetTypeStructure[]>>;

  getAssetTypeStructureCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetTypeStructureById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetTypeStructure>;

}
