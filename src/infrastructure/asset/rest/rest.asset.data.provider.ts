import {AssetDataProvider} from "../../../port/asset.data.provider";
import {Asset} from "../../../domain/model/asset/asset";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
// import {Sort} from "../../../util/sort";
// import {Page} from "../../../util/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Assets } from "../../../domain/model/asset/assets";
import { AssetRequest } from "../../../domain/model/asset/request/asset.request";


export class RestAssetDataProvider implements AssetDataProvider {
  addAsset(asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return undefined;
  }

  deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
    return undefined;
  }

  getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return undefined;
  }

  // getAssetCount(headerOptions?: HeaderBaseOptions): Observable<number> {
  //   return undefined;
  // }

  getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets> {
    return undefined;
  }

  updateAsset(assetId: string, asset: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }
}
