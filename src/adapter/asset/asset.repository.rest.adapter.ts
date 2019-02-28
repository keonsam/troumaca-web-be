import { AssetRepository } from "../../repository/asset.repository";
import { Asset } from "../../data/asset/asset";
import { Observable } from "rxjs";
import { AssetSpecification } from "../../data/asset/asset.specification";
import { AssetBrand } from "../../data/asset/asset.brand";
import { AssetCharacteristics } from "../../data/asset/asset.characteristics";


export class AssetRepositoryRestAdapter implements AssetRepository {

  constructor() {
  }

  findAssets(searchStr: string, pageSize: number, options: any): Observable<Asset[]> {
    return undefined;
  }

  getAssets(pageNumber: number, pageSize: number, order: string, options: any): Observable<Asset[]> {
    return undefined;
  }

  getAssetCount(options: any): Observable<number> {
    return undefined;
  }

  getAssetById(assetId: string, options: any): Observable<Asset> {
    return undefined;
  }

  saveAsset(asset: Asset, options: any): Observable<Asset> {
    return undefined;
  }

  updateAsset(assetId: string, asset: Asset, options: any): Observable<number> {
    return undefined;
  }

  deleteAsset(assetId: string, options: any): Observable<number> {
    return undefined;
  }

}
