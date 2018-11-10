import {createAssetRepositoryFactory} from "../../adapter/asset/asset.repository.factory";
import {shapeAssetsResponse} from "./asset.response.shaper";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetRepository} from "../../repository/asset.repository";
import {Asset} from "../../data/asset/asset";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../../result.success";

export class AssetOrchestrator {

  private assetRepository: AssetRepository;

  constructor(options?: any) {
    this.assetRepository = createAssetRepositoryFactory(options);
  }

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.assetRepository.findAssets(searchStr, pageSize);
  }

  getAssets(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.assetRepository
        .getAssets(number, size, sort)
        .pipe(switchMap((assets: Asset[]) => {
            return this.assetRepository
                .getAssetCount()
                .pipe(map(count => {
                    const shapeAssetsResp: any = shapeAssetsResponse(assets, number, size, assets.length, count, sort);
                    return new Result<any>(false, "assets", shapeAssetsResp);
                }));
        }));
  }

  getAssetById(assetId: string): Observable<Asset> {
    return this.assetRepository.getAssetById(assetId);
  }

  saveAsset(asset: Asset): Observable<Asset> {
    return this.assetRepository.saveAsset(asset);
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  deleteAsset(assetId: string): Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

}

