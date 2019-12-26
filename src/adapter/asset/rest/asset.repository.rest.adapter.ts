import {AssetRepository} from "../../../repository/asset.repository";
import {Asset} from "../../../data/asset/asset";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Assets } from "../../../data/asset/assets";
import { AssetInput } from "../../../graphql/asset/dto/asset.input";


export class AssetRepositoryRestAdapter implements AssetRepository {
  addAsset(asset: AssetInput, headerOptions?: HeaderBaseOptions): Observable<Asset> {
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

  updateAsset(assetId: string, asset: Asset, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }
}
