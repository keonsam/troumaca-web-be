import { AssetRoleTypeRepository } from "../../repository/asset.role.type.repository";
import { AssetRoleType} from "../../data/asset/asset.role.type";
import { Observable } from "rxjs";

export class AssetRoleTypeRepositoryRestAdapter implements AssetRoleTypeRepository {

  constructor() {
  }

  findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetRoleTypeById(assetRoleTypeId: string): Observable<AssetRoleType> {
    return undefined;
  }

  saveAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
    return undefined;
  }

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType): Observable<number> {
    return undefined;
  }

  deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
    return undefined;
  }

}
