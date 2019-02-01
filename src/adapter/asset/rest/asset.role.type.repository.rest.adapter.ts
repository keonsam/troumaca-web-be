import {AssetRoleTypeRepository} from "../../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../../data/asset/asset.role.type";
import {Observable} from "rxjs";

export class AssetRoleTypeRepositoryRestAdapter implements AssetRoleTypeRepository {
  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType> {
    return undefined;
  }

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<number> {
    return undefined;
  }

  deleteAssetRoleType(assetId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  findAssetRoleTypes(searchStr: string, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypeById(assetId: string, headerOptions?: any): Observable<AssetRoleType> {
    return undefined;
  }

  getAssetRoleTypeCount(headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string, headerOptions?: any): Observable<AssetRoleType[]> {
    return undefined;
  }
}