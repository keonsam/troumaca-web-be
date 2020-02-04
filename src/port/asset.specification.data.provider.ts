import {AssetSpecification} from "../domain/model/asset/asset.specification";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetSpecificationDataProvider {

  addAssetSpecification(assetSpecification: AssetSpecification, headerOptions?: any): Observable<AssetSpecification>;

  updateAssetSpecification(assetSpecification: AssetSpecification, headerOptions?: any): Observable<Affect>;

  deleteAssetSpecification(assetSpecificationId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetSpecifications(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetSpecification[]>;

  getAssetSpecifications(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetSpecification[]>>;

  getAssetSpecificationCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetSpecificationById(assetSpecificationId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetSpecification>;

}
