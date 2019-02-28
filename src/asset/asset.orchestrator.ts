import {createAssetRepositoryFactory} from "../adapter/asset/asset.repository.factory";
import {shapeAssetsResponse} from "./asset.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetRepository} from "../repository/asset.repository";
import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class AssetOrchestrator {

  private assetRepository: AssetRepository;

  constructor(options?: any) {
    this.assetRepository = createAssetRepositoryFactory(options);
  }

  findAssets(searchStr: string, pageSize: number, options: any): Observable<Asset[]> {
    return this.assetRepository.findAssets(searchStr, pageSize, options);
  }

  getAssets(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.assetRepository
        .getAssets(number, size, sort, options)
        .pipe(switchMap((assets: Asset[]) => {
          return this.assetRepository
              .getAssetCount(options)
              .pipe(map((count: number) => {
                const shapeAssetsResp: any = shapeAssetsResponse(assets, number, size, assets.length, count, sort);
                return new Result<any>(false, "assets", shapeAssetsResp);
              }));
        }));
  }

  getAssetById(assetId: string, options: any): Observable<Asset> {
    return this.assetRepository.getAssetById(assetId, options);
  }

  saveAsset(asset: Asset, options: any): Observable<Asset> {
    return this.assetRepository.saveAsset(asset, options);
  }

  updateAsset(assetId: string, asset: Asset, options: any): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset, options);
  }

  deleteAsset(assetId: string, options: any): Observable<number> {
    return this.assetRepository.deleteAsset(assetId, options);
  }

}

