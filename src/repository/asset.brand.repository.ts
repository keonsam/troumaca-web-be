import {AssetBrand} from "../data/asset/asset.brand";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface AssetBrandRepository {

  addAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<AssetBrand>;

  updateAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<Affect>;

  deleteAssetBrand(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetBrands(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetBrand[]>;

  getAssetBrands(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetBrand[]>>;

  getAssetBrandCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetBrandById(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetBrand>;

}
