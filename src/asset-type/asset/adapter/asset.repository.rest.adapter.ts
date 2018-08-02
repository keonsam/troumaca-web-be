import { AssetRepository } from "../asset.repository";
import { Observable } from "rxjs/Observable";
import { Asset } from "../asset";


export class AssetRepositoryRestAdapter implements AssetRepository {

  constructor() {
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
