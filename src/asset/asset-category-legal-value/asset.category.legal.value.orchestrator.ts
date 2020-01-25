import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {AssetCategoryLegalValue} from "../../data/asset/asset.category.legal.value";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";
import {AssetCategoryLegalValueRepository} from "../../repository/asset.category.legal.value.repository";
import {createAssetCategoryLegalValueRepository} from "../../adapter/asset/asset.category.legal.value.repository.factory";
import {AssetCategoryLegalValues} from "../../data/asset/asset.category.legal.values";

export class AssetCategoryLegalValueOrchestrator {

  private assetCategoryLegalValueRepository: AssetCategoryLegalValueRepository;

  constructor(options?: any) {
    this.assetCategoryLegalValueRepository = createAssetCategoryLegalValueRepository(options);
  }

  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return this.assetCategoryLegalValueRepository.addAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions);
  }

  findAssetCategoryLegalValues(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]> {
    return this.assetCategoryLegalValueRepository.findAssetCategoryLegalValues(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetCategoryLegalValues(search: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValues> {
    return this.assetCategoryLegalValueRepository.getAssetCategoryLegalValues(search, pageNumber, pageSize, headerOptions);
  }

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect> {
    return this.assetCategoryLegalValueRepository.updateAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions);
  }

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return this.assetCategoryLegalValueRepository.getAssetCategoryLegalValueById(assetCategoryLegalValueId, headerOptions);
  }

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string, headerOptions?: any): Observable<Affect> {
    return this.assetCategoryLegalValueRepository.deleteAssetCategoryLegalValue(assetCategoryLegalValueId, headerOptions);
  }

}
