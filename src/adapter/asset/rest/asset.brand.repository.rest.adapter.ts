import {AssetBrandRepository} from "../../../repository/asset.brand.repository";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetBrandRepositoryRestAdapter implements AssetBrandRepository {
  addAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<AssetBrand> {
    return undefined;
  }

  deleteAssetBrand(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetBrands(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetBrand[]> {
    return undefined;
  }

  getAssetBrandById(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetBrand> {
    return undefined;
  }

  getAssetBrandCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetBrands(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetBrand[]>> {
    return undefined;
  }

  updateAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}