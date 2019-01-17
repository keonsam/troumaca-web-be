import {createAssetRepositoryFactory} from "../adapter/asset/asset.repository.factory";
import {shapeAssetsResponse} from "./asset.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetRepository} from "../repository/asset.repository";
import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";
import { AssetCharacteristics } from "../data/asset/asset.characteristics";
import { AssetBrand } from "../data/asset/asset.brand";
import { AssetSpecification } from "../data/asset/asset.specification";

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
                .pipe(map((count: number) => {
                    const shapeAssetsResp: any = shapeAssetsResponse(assets, number, size, assets.length, count, sort);
                    return new Result<any>(false, "assets", shapeAssetsResp);
                }));
        }));
  }

  getAssetById(assetId: string): Observable<Asset> {
    return this.assetRepository.getAssetById(assetId);
  }

  getAssetSpecById(assetId: string): Observable<AssetSpecification> {
    return this.assetRepository.getAssetSpecById(assetId);
  }

  getAssetBrandById(assetId: string): Observable<AssetBrand> {
    return this.assetRepository.getAssetBrandById(assetId);
  }

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics> {
    return this.assetRepository.getAssetCharacteristicsById(assetId);
  }

  saveAsset(asset: Asset): Observable<Asset> {
    return this.assetRepository.saveAsset(asset);
  }

  addAssetSpec(asset: AssetSpecification): Observable<AssetSpecification> {
    return this.assetRepository.addAssetSpec(asset);
  }

  addAssetBrand(asset: AssetBrand): Observable<AssetBrand> {
    return this.assetRepository.addAssetBrand(asset);
  }

  addAssetCharacteristics(asset: AssetCharacteristics): Observable<AssetCharacteristics> {
    return this.assetRepository.addAssetCharacteristics(asset);
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  updateAssetSpec(assetId: string, asset: AssetSpecification): Observable<number> {
    return this.assetRepository.updateAssetSpec(assetId, asset);
  }

  updateAssetBrand(assetId: string, asset: AssetBrand): Observable<number> {
    return this.assetRepository.updateAssetBrand(assetId, asset);
  }

  updateAssetChars(assetId: string, asset: AssetCharacteristics): Observable<number> {
    return this.assetRepository.updateAssetChars(assetId, asset);
  }

  deleteAsset(assetId: string): Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

}

