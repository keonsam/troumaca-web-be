import { AssetRepository } from "../asset.repository";
import { Observable } from "rxjs";
import { Asset } from "../asset";


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
