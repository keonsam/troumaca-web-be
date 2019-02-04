import {AssetCategoryLegalValueRepository} from "../../../repository/asset.category.legal.value.repository";
import {AssetCategoryLegalValue} from "../../../data/asset/asset.category.legal.value";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetCategoryLegalValueRepositoryRestAdapter implements AssetCategoryLegalValueRepository {
  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return undefined;
  }

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetCategoryLegalValues(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]> {
    return undefined;
  }

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return undefined;
  }

  getAssetCategoryLegalValueCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetCategoryLegalValues(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCategoryLegalValue[]>> {
    return undefined;
  }

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect> {
    return undefined;
  }


}