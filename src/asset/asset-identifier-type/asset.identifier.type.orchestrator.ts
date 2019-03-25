import {Observable} from "rxjs";
import {Affect} from "../../data/affect";
import {AssetIdentifierType} from "../../data/asset/asset.identifier.type";
import {AssetIdentifierTypeRepository} from "../../repository/asset.identifier.type.repository";
import {createAssetIdentifierTypeRepository} from "../../adapter/asset/asset.identifier.type.repository.factory";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetIdentifierTypeOrchestrator {

  private assetIdentifierTypeRepository: AssetIdentifierTypeRepository;

  constructor(options?: any) {
    this.assetIdentifierTypeRepository = createAssetIdentifierTypeRepository(options);
  }

  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?:any): Observable<AssetIdentifierType> {
    return undefined;
    // return this.assetIdentifierTypeRepository.addAssetIdentifierType(assetIdentifierType, headerOptions);
  }

  findAssetIdentifierTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetIdentifierType[]> {
    return undefined;
    // return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetIdentifierTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierType[]>> {
    return undefined;
    // return this.assetIdentifierTypeRepository.getAssetIdentifierTypes(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?:any): Observable<Affect> {
    return undefined;
    // return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierType, headerOptions);
  }

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetIdentifierType> {
    return undefined;
    // return this.assetIdentifierTypeRepository.getAssetIdentifierTypeById(assetIdentifierTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return undefined;
    // return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId, ownerPartyId, headerOptions);
  }

}
