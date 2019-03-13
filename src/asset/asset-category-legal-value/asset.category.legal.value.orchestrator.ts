import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {AssetCategoryLegalValue} from "../../data/asset/asset.category.legal.value";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";
import {AssetCategoryLegalValueRepository} from "../../repository/asset.category.legal.value.repository";
import {createAssetCategoryLegalValueRepository} from "../../adapter/asset/asset.category.legal.value.repository.factory";

export class AssetCategoryLegalValueOrchestrator {

  private assetCategoryLegalValueRepository: AssetCategoryLegalValueRepository;

  constructor(options?: any) {
    this.assetCategoryLegalValueRepository = createAssetCategoryLegalValueRepository(options);
  }

  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?:any): Observable<AssetCategoryLegalValue> {
    return this.assetCategoryLegalValueRepository.addAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions);
  }

  findAssetCategoryLegalValues(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetCategoryLegalValue[]> {
    return this.assetCategoryLegalValueRepository.findAssetCategoryLegalValues(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetCategoryLegalValues(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCategoryLegalValue[]>> {
    return this.assetCategoryLegalValueRepository.getAssetCategoryLegalValues(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?:any): Observable<Affect> {
    return this.assetCategoryLegalValueRepository.updateAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions);
  }

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetCategoryLegalValue> {
    return this.assetCategoryLegalValueRepository.getAssetCategoryLegalValueById(assetCategoryLegalValueId, ownerPartyId, headerOptions);
  }

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return this.assetCategoryLegalValueRepository.deleteAssetCategoryLegalValue(assetCategoryLegalValueId, ownerPartyId, headerOptions);
  }

}