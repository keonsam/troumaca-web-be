import {AssetStructureType} from "../domain/model/asset/asset.structure.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetStructureTypeDataProvider {

  addAssetStructureType(assetType: AssetStructureType, headerOptions?: any): Observable<AssetStructureType>;

  updateAssetStructureType(assetType: AssetStructureType, headerOptions?: any): Observable<Affect>;

  deleteAssetStructureType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetStructureTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructureType[]>;

  getAssetStructureTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructureType[]>>;

  getAssetStructureTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetStructureTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructureType>;

}
