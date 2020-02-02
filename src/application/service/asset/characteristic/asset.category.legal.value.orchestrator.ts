import {Observable} from "rxjs";
import {Affect} from "../../../../domain/model/affect";
import {AssetCategoryLegalValue} from "../../../../domain/model/asset/asset.category.legal.value";
// import {Page} from "../../../../util/page";
// import {Sort} from "../../../../util/sort";
import {AssetCategoryLegalValueDataProvider} from "../../../../port/asset.category.legal.value.data.provider";
import {createAssetCategoryLegalValueDataProvider} from "../../../../infrastructure/asset/asset.category.legal.value.data.provider.factory";
import {AssetCategoryLegalValues} from "../../../../domain/model/asset/asset.category.legal.values";

export class AssetCategoryLegalValueOrchestrator {

  private assetCategoryLegalValueRepository: AssetCategoryLegalValueDataProvider;

  constructor(options?: any) {
    this.assetCategoryLegalValueRepository = createAssetCategoryLegalValueDataProvider(options);
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
