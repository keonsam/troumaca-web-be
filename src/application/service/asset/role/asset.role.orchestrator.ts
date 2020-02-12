import {AssetRole} from "../../../../domain/model/asset/asset.role";
import {Observable} from "rxjs";
import {AssetRoleDataProvider} from "../../../../port/asset.role.data.provider";
import {createAssetRoleDataProvider} from "../../../../infrastructure/asset/asset.role.data.provider.factory";
import {Affect} from "../../../../domain/model/affect";
import {Page} from "../../../../util/page";
import {Sort} from "../../../../util/sort";

export class AssetRoleOrchestrator {

  private assetRoleRepository: AssetRoleDataProvider;

  constructor(options?: any) {
    this.assetRoleRepository = createAssetRoleDataProvider(options);
  }

  addAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<AssetRole> {
    return this.assetRoleRepository.addAssetRole(assetRole, headerOptions);
  }

  findAssetRoles(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRole[]> {
    return this.assetRoleRepository.findAssetRoles(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetRoles(ownerPartyId: string, number: number, size: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRole[]>> {
    return this.assetRoleRepository.getAssetRoles(ownerPartyId, number, size, sort, headerOptions);
  }

  updateAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<Affect> {
    return this.assetRoleRepository.updateAssetRole(assetRole, headerOptions);
  }

  getAssetRoleById(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRole> {
    return this.assetRoleRepository.getAssetRoleById(assetRoleId, ownerPartyId, headerOptions);
  }

  deleteAssetRole(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetRoleRepository.deleteAssetRole(assetRoleId, ownerPartyId, headerOptions);
  }

}