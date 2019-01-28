import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import { AssetSpecification } from "../data/asset/asset.specification";
import { AssetBrand } from "../data/asset/asset.brand";
import { AssetCharacteristic } from "../data/asset/asset.characteristic";

export interface AssetRepository {

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]>;

  getAssetCount(): Observable<number>;

  getAssetById(assetId: string): Observable<Asset>;

  getAssetSpecById(assetId: string): Observable<AssetSpecification>;

  getAssetBrandById(assetId: string): Observable<AssetBrand>;

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristic>;

  saveAsset(asset: Asset): Observable<Asset>;

  addAssetSpec(asset: AssetSpecification): Observable<AssetSpecification>;

  addAssetBrand(asset: AssetBrand): Observable<AssetBrand>;

  addAssetCharacteristics(asset: AssetCharacteristic): Observable<AssetCharacteristic>;

  updateAsset(assetId: string, asset: Asset): Observable<number>;

  updateAssetSpec(assetId: string, asset: AssetSpecification): Observable<number>;

  updateAssetBrand(assetId: string, asset: AssetBrand): Observable<number>;

  updateAssetChars(assetId: string, asset: AssetCharacteristic): Observable<number>;

  deleteAsset(assetId: string): Observable<number>;

}
