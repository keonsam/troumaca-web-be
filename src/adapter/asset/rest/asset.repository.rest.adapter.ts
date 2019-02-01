import { AssetRepository } from "../../../repository/asset.repository";
import { Asset } from "../../../data/asset/asset";
import { Observable } from "rxjs";
import { AssetSpecification } from "../../../data/asset/asset.specification";
import { AssetBrand } from "../../../data/asset/asset.brand";
import { AssetCharacteristic } from "../../../data/asset/asset.characteristic";


export class AssetRepositoryRestAdapter implements AssetRepository {

  constructor() {
  }

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return undefined;
  }

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]> {
    return undefined;
  }

  getAssetCount(): Observable<number> {
    return undefined;
  }

  getAssetById(assetId: string): Observable<Asset> {
    return undefined;
  }

  getAssetSpecById(assetId: string): Observable<AssetSpecification> {
    return undefined;
  }

  getAssetBrandById(assetId: string): Observable<AssetBrand> {
    return undefined;
  }

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristic> {
    return undefined;
  }

  saveAsset(asset: Asset): Observable<Asset> {
    return undefined;
  }

  addAssetSpec(asset: AssetSpecification): Observable<AssetSpecification> {
    return undefined;
  }

  addAssetBrand(asset: AssetBrand): Observable<AssetBrand> {
    return undefined;
  }

  addAssetCharacteristics(asset: AssetCharacteristic): Observable<AssetCharacteristic> {
    return undefined;
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return undefined;
  }

  updateAssetSpec(assetId: string, asset: AssetSpecification): Observable<number> {
    return undefined;
  }

  updateAssetBrand(assetId: string, asset: AssetBrand): Observable<number> {
    return undefined;
  }

  updateAssetChars(assetId: string, asset: AssetCharacteristic): Observable<number> {
    return undefined;
  }

  deleteAsset(assetId: string): Observable<number> {
    return undefined;
  }

}
