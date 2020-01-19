import {AssetRoleTypeRepository} from "../../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetRoleTypes } from "../../../data/asset/asset.role.types";

export class AssetRoleTypeRepositoryRestAdapter implements AssetRoleTypeRepository {
  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType> {
    return undefined;
  }

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findAssetRoleTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypeById(assetRoleTypeId: string,  headerOptions?: HeaderBaseOptions): Observable<AssetRoleType> {
    return undefined;
  }

  // getAssetRoleTypeCount(headerOptions?: HeaderBaseOptions): Observable<number> {
  //   return undefined;
  // }

  getAssetRoleTypes(search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetRoleTypes> {
    return undefined;
  }

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

}
