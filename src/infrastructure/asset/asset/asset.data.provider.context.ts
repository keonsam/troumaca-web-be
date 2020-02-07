import {AssetDataProvider} from "../../../port/asset.data.provider";
import {AssetRequest} from "../../../domain/model/asset/request/asset.request";
import {HeaderBaseOptions} from "../../../header.base.options";
import {Observable} from "rxjs";
import {Asset} from "../../../domain/model/asset/asset";
import {Affect} from "../../../domain/model/affect";
import {Assets} from "../../../domain/model/asset/assets";
import {createAssetDataProvider} from "./asset.data.provider.factory";

export class AssetDataProviderContext implements AssetDataProvider {

  private assetDataProvider: AssetDataProvider;

  constructor(assetDataProvider?: AssetDataProvider) {
    if (assetDataProvider != null) {
      this.assetDataProvider = assetDataProvider;
    } else  {
      this.assetDataProvider = createAssetDataProvider()
    }
  }

  addAsset(asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetDataProvider.addAsset(asset, headerOptions);
  }

  deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return this.assetDataProvider.deleteAsset(assetId, headerOptions);
  }

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
    return this.assetDataProvider.findAssets(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetDataProvider.getAssetById(assetId, headerOptions);
  }

  getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets> {
    return this.assetDataProvider.getAssets(search, pageNumber, pageSize, headerOptions);
  }

  updateAsset(assetId: string, asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return this.assetDataProvider.updateAsset(assetId, asset, headerOptions);
  }

}