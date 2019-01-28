import {AssetRoleType} from "../data/asset/asset.role.type";
import {Observable} from "rxjs";

export interface AssetRoleTypeRepository {

  saveAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType>;

}