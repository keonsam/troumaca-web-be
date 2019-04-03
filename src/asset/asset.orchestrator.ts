import {Asset} from "../data/asset/asset";
import {Observable} from "rxjs";
import {AssetRepository} from "../repository/asset.repository";
import {createAssetRepository} from "../adapter/asset/asset.repository.factory";
import {Affect} from "../data/affect";
import {Page} from "../util/page";
import {Sort} from "../util/sort";

export class AssetOrchestrator {

  private assetRepository: AssetRepository;

  constructor(options?: any) {
    this.assetRepository = createAssetRepository(options);
  }

  addAsset(asset: Asset, headerOptions?: any): Observable<Asset> {
    return this.assetRepository.addAsset(asset, headerOptions);
  }

  findAssets(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<Asset[]> {
    return this.assetRepository.findAssets(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssets(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<Asset[]>> {
    return this.assetRepository.getAssets(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAsset(assetId: string, asset: Asset, headerOptions?: any): Observable<Affect> {
    return undefined;
    // return this.assetRepository.updateAsset(assetId, asset, headerOptions);
  }

  getAssetById(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Asset> {
    return this.assetRepository.getAssetById(assetId, ownerPartyId, headerOptions);
  }

  deleteAsset(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetRepository.deleteAsset(assetId, ownerPartyId, headerOptions);
  }

}
