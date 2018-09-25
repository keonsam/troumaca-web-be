import { AssetRepository } from "../../repository/asset.repository";
import { Asset } from "../../data/asset/asset";
import { Observable } from "rxjs";


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

    saveAsset(asset: Asset): Observable<Asset> {
        return undefined;
    }

    updateAsset(assetId: string, asset: Asset): Observable<number> {
        return undefined;
    }

    deleteAsset(assetId: string): Observable<number> {
        return undefined;
    }

}
