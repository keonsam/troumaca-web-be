import {AssetBrandRepository} from "../../../repository/asset.brand.repository";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {Observable} from "rxjs";

export class AssetBrandRepositoryNeDbAdapter implements AssetBrandRepository {
  deleteAssetBrand(assetId: string): Observable<number> {
    return undefined;
  }

  findAssetBrands(searchStr: string, pageSize: number): Observable<AssetBrand[]> {
    return undefined;
  }

  getAssetBrandById(assetId: string): Observable<AssetBrand> {
    return undefined;
  }

  getAssetBrandCount(): Observable<number> {
    return undefined;
  }

  getAssetBrands(pageNumber: number, pageSize: number, order: string): Observable<AssetBrand[]> {
    return undefined;
  }

}