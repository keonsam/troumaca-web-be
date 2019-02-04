import {AssetRoleTypeRepository} from "../../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetRoleTypeRepositoryRestAdapter implements AssetRoleTypeRepository {
  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType> {
    return undefined;
  }

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetRoleTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypeById(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRoleType> {
    return undefined;
  }

  getAssetRoleTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetRoleTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRoleType[]>> {
    return undefined;
  }

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}