import {AssetRoleTypeDataProvider} from "../../../port/asset.role.type.data.provider";
import {AssetRoleType} from "../../../domain/model/asset/asset.role.type";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
// import {Page} from "../../../util/page";
// import {Sort} from "../../../util/sort";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetRoleTypes } from "../../../domain/model/asset/asset.role.types";

export class RestAssetRoleTypeDataProvider implements AssetRoleTypeDataProvider {
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
