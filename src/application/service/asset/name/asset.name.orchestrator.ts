import {AssetName} from "../../../../domain/model/asset/asset.name";
import {Observable} from "rxjs";
import {AssetNameDataProvider} from "../../../../port/asset.name.data.provider";
import {createAssetNameDataProvider} from "../../../../infrastructure/asset/asset.name.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetNameOrchestrator {

  private assetNameRepository: AssetNameDataProvider;

  constructor(options?: any) {
    this.assetNameRepository = createAssetNameDataProvider(options);
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