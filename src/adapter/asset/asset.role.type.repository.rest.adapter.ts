import { AssetRoleTypeRepository } from "../../repository/asset.role.type.repository";
import { AssetRoleType} from "../../data/asset/asset.role.type";
import { Observable } from "rxjs";

export class AssetRoleTypeRepositoryRestAdapter implements AssetRoleTypeRepository {

  constructor() {
  }

  findAssetRoleTypes(searchStr: string, pageSize: number, options: any): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypeCount(options: any): Observable<number> {
    return undefined;
  }

  getAssetRoleTypeById(assetRoleTypeId: string, options: any): Observable<AssetRoleType> {
    return undefined;
  }

  saveAssetRoleType(assetRoleType: AssetRoleType, options: any): Observable<AssetRoleType> {
    return undefined;
  }

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, options: any): Observable<number> {
    return undefined;
  }

  deleteAssetRoleType(assetRoleTypeId: string, options: any): Observable<number> {
    return undefined;
  }

}
