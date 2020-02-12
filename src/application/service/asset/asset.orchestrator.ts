import {Asset} from "../../../domain/model/asset/asset";
import {Observable} from "rxjs";
import {AssetDataProvider} from "../../../port/asset.data.provider";
import { HeaderBaseOptions } from "../../../header.base.options";
import { map } from "rxjs/operators";
import { Assets } from "../../../domain/model/asset/assets";
import { AssetRequest } from "../../../domain/model/asset/request/asset.request";
import {AssetDataProviderContext} from "../../../infrastructure/asset/asset/asset.data.provider.context";

export class AssetOrchestrator {

  private assetDataProvider: AssetDataProvider;

  constructor(assetDataProvider?: AssetDataProvider) {
    if (assetDataProvider != null) {
      this.assetDataProvider = assetDataProvider;
    } else {
      this.assetDataProvider = new AssetDataProviderContext();
    }
  }

  addAsset(asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetDataProvider.addAsset(asset, headerOptions);
  }

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
    return this.assetDataProvider.findAssets(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets> {
    return this.assetDataProvider.getAssets(search, pageNumber, pageSize, headerOptions);
  }

  updateAsset(assetId: string, asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetDataProvider.updateAsset(assetId, asset, headerOptions)
        .pipe(map( aff => aff.affected));
  }

  getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetDataProvider.getAssetById(assetId, headerOptions);
  }

  deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetDataProvider.deleteAsset(assetId, headerOptions)
        .pipe(map( aff => aff.affected));
  }

}
