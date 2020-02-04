import {Asset} from "../../../domain/model/asset/asset";
import {Observable} from "rxjs";
import {AssetDataProvider} from "../../../port/asset.data.provider";
import {createAssetDataProvider} from "../../../infrastructure/asset/asset.data.provider.factory";
import { HeaderBaseOptions } from "../../../header.base.options";
import { map } from "rxjs/operators";
import { Assets } from "../../../domain/model/asset/assets";
import { AssetRequest } from "../../../domain/model/asset/request/asset.request";

export class AssetOrchestrator {

  private assetRepository: AssetDataProvider;

  constructor(options?: any) {
    this.assetRepository = createAssetDataProvider(options);
  }

  addAsset(asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetRepository.addAsset(asset, headerOptions);
  }

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
    return this.assetRepository.findAssets(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets> {
    return this.assetRepository.getAssets(search, pageNumber, pageSize, headerOptions);
  }

  updateAsset(assetId: string, asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset, headerOptions)
        .pipe(map( aff => aff.affected));
  }

  getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetRepository.getAssetById(assetId, headerOptions);
  }

  deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetRepository.deleteAsset(assetId, headerOptions)
        .pipe(map( aff => aff.affected));
  }

}
