import {AssetRoleRepository} from "../../../repository/asset.role.repository";
import {AssetRole} from "../../../data/asset/asset.role";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetRoleRepositoryRestAdapter implements AssetRoleRepository {
  addAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<AssetRole> {
    return undefined;
  }

  deleteAssetRole(assetRoleId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetRoles(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRole[]> {
    return undefined;
  }

  getAssetRoleById(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRole> {
    return undefined;
  }

  getAssetRoleCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetRoles(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRole[]>> {
    return undefined;
  }

  updateAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}