import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import {AssetRepository} from "../repository/asset.repository";
import {createAssetRepository} from "../adapter/asset/asset.repository.factory";
import {Affect} from "../data/affect";
import {Page} from "../util/page";
import {Sort} from "../util/sort";
import { HeaderBaseOptions } from "../header.base.options";
import { map } from "rxjs/operators";
import { Assets } from "../data/asset/assets";
import { AssetInput } from "../graphql/asset/dto/asset.input";

export class AssetOrchestrator {

  private assetRepository: AssetRepository;

  constructor(options?: any) {
    this.assetRepository = createAssetRepository(options);
  }

  addAsset(asset: AssetInput, headerOptions?: HeaderBaseOptions): Observable<Asset> {
    return this.assetRepository.addAsset(asset, headerOptions);
  }

  findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
    return this.assetRepository.findAssets(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets> {
    return this.assetRepository.getAssets(search, pageNumber, pageSize, headerOptions);
  }

  updateAsset(assetId: string, asset: Asset, headerOptions?: HeaderBaseOptions): Observable<number> {
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
