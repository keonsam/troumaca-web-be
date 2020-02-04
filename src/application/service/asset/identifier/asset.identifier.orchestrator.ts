import {AssetIdentifier} from "../../../../domain/model/asset/asset.identifier";
import {Observable} from "rxjs";
import {AssetIdentifierDataProvider} from "../../../../port/asset.identifier.data.provider";
import {createAssetIdentifierDataProvider} from "../../../../infrastructure/asset/asset.identifier.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetIdentifierOrchestrator {

  private assetIdentifierRepository: AssetIdentifierDataProvider;

  constructor(options?: any) {
    this.assetIdentifierRepository = createAssetIdentifierDataProvider(options);
  }

  addAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<AssetIdentifier> {
    return this.assetIdentifierRepository.addAssetIdentifier(assetIdentifier, headerOptions);
  }

  findAssetIdentifiers(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifier[]> {
    return this.assetIdentifierRepository.findAssetIdentifiers(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetIdentifiers(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifier[]>> {
    return this.assetIdentifierRepository.getAssetIdentifiers(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<Affect> {
    return this.assetIdentifierRepository.updateAssetIdentifier(assetIdentifier, headerOptions);
  }

  getAssetIdentifierById(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifier> {
    return this.assetIdentifierRepository.getAssetIdentifierById(assetIdentifierId, ownerPartyId, headerOptions);
  }

  deleteAssetIdentifier(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetIdentifierRepository.deleteAssetIdentifier(assetIdentifierId, ownerPartyId, headerOptions);
  }

}