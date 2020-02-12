import {AssetIdentifier} from "../domain/model/asset/asset.identifier";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetIdentifierDataProvider {

  addAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<AssetIdentifier>;

  updateAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<Affect>;

  deleteAssetIdentifier(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetIdentifiers(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifier[]>;

  getAssetIdentifiers(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifier[]>>;

  getAssetIdentifierCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetIdentifierById(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifier>;

}
