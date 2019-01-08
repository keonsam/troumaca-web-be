import { AssetRepository } from "../../repository/asset.repository";
import { Asset } from "../../data/asset/asset";
import { Observable } from "rxjs";
import { AssetSpecification } from "../../data/asset/asset.specification";
import { AssetBrand } from "../../data/asset/asset.brand";
import { AssetCharacteristics } from "../../data/asset/asset.characteristics";


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

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics> {
    return undefined;
  }

  saveAsset(asset: Asset): Observable<Asset> {
    return undefined;
  }

  addAssetSpec(asset: Asset): Observable<AssetSpecification> {
    return undefined;
  }

  addAssetBrand(asset: Asset): Observable<AssetBrand> {
    return undefined;
  }

  addAssetCharacteristics(asset: Asset): Observable<AssetCharacteristics> {
    return undefined;
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return undefined;
  }

  deleteAsset(assetId: string): Observable<number> {
    return undefined;
  }

}
