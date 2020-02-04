import {AssetRoleDataProvider} from "../../../port/asset.role.data.provider";
import {AssetRole} from "../../../domain/model/asset/asset.role";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class RestAssetRoleDataProvider implements AssetRoleDataProvider {
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