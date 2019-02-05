import {AssetRepository} from "../../../repository/asset.repository";
import {Asset} from "../../../data/asset/asset";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";


export class AssetRepositoryRestAdapter implements AssetRepository {
  addAsset(asset: Asset, headerOptions?: any): Observable<Asset> {
    return undefined;
  }

  deleteAsset(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssets(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<Asset[]> {
    return undefined;
  }

  getAssetById(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Asset> {
    return undefined;
  }

  getAssetCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssets(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<Asset[]>> {
    return undefined;
  }

  updateAsset(asset: Asset, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}
