import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import { AssetSpecification } from "../data/asset/asset.specification";
import { AssetBrand } from "../data/asset/asset.brand";
import { AssetCharacteristics } from "../data/asset/asset.characteristics";

export interface AssetRepository {

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]>;

  getAssetCount(): Observable<number>;

  getAssetById(assetId: string): Observable<Asset>;

  getAssetSpecById(assetId: string): Observable<AssetSpecification>;

  getAssetBrandById(assetId: string): Observable<AssetBrand>;

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics>;

  saveAsset(asset: Asset): Observable<Asset>;

  addAssetSpec(asset: Asset): Observable<AssetSpecification>;

  addAssetBrand(asset: Asset): Observable<AssetBrand>;

  addAssetCharacteristics(asset: Asset): Observable<AssetCharacteristics>;

  updateAsset(assetId: string, asset: Asset): Observable<number>;

  deleteAsset(assetId: string): Observable<number>;

}
