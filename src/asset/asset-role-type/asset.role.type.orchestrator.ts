import {AssetRoleType} from "../../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";

export class AssetRoleTypeOrchestrator {

  private assetRoleTypeRepository: AssetRoleTypeRepository;

  saveAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.saveAssetRoleType(assetRoleType);
  }

}