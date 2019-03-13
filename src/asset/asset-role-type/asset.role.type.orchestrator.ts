import {AssetRoleType} from "../../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";
import {createAssetRoleTypeRepository} from "../../adapter/asset/asset.role.type.repository.factory";
import {Affect} from "../../data/affect";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class AssetRoleTypeOrchestrator {

  private assetRoleTypeRepository: AssetRoleTypeRepository;

  constructor(options?: any) {
    this.assetRoleTypeRepository = createAssetRoleTypeRepository(options);
  }

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.addAssetRoleType(assetRoleType, headerOptions);
  }

  findAssetRoleTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]> {
    return this.assetRoleTypeRepository.findAssetRoleTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetRoleTypes(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRoleType[]>> {
    return this.assetRoleTypeRepository.getAssetRoleTypes(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<Affect> {
    return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleType, headerOptions);
  }

  getAssetRoleTypeById(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId, ownerPartyId, headerOptions);
  }

  deleteAssetRoleType(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId, ownerPartyId, headerOptions);
  }

}