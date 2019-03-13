import {AssetName} from "../../data/asset/asset.name";
import {Observable} from "rxjs";
import {AssetNameRepository} from "../../repository/asset.name.repository";
import {createAssetNameRepository} from "../../adapter/asset/asset.name.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetNameOrchestrator {

  private assetNameRepository: AssetNameRepository;

  constructor(options?: any) {
    this.assetNameRepository = createAssetNameRepository(options);
  }

  addAssetName(assetName: AssetName, headerOptions?: any): Observable<AssetName> {
    return this.assetNameRepository.addAssetName(assetName, headerOptions);
  }

  findAssetNames(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetName[]> {
    return this.assetNameRepository.findAssetNames(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetNames(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetName[]>> {
    return this.assetNameRepository.getAssetNames(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetName(assetName: AssetName, headerOptions?: any): Observable<Affect> {
    return this.assetNameRepository.updateAssetName(assetName, headerOptions);
  }

  getAssetNameById(assetNameId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetName> {
    return this.assetNameRepository.getAssetNameById(assetNameId, ownerPartyId, headerOptions);
  }

  deleteAssetName(assetNameId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetNameRepository.deleteAssetName(assetNameId, ownerPartyId, headerOptions);
  }

}