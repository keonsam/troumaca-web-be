import {AssetBrand} from "../data/asset/asset.brand";
import {Observable} from "rxjs";

export interface AssetBrandRepository {

  findAssetBrands(searchStr: string, pageSize: number): Observable<AssetBrand[]>;

  getAssetBrands(pageNumber: number, pageSize: number, order: string): Observable<AssetBrand[]>;

  getAssetBrandCount(): Observable<number>;

  getAssetBrandById(assetId: string): Observable<AssetBrand>;

  deleteAssetBrand(assetId: string): Observable<number>;
}
