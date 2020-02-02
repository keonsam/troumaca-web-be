import {AssetTypeDataProvider} from "../../../port/asset.type.data.provider";
import {AssetType} from "../../../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
// import {Sort} from "../../../util/sort";
import { AssetTypes } from "../../../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetTypeRequest } from "../../../domain/model/asset/request/asset.type.request";

export class RestAssetTypeDataProvider implements AssetTypeDataProvider {
  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return undefined;
  }

  deleteAssetType(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return undefined;
  }

  getAssetTypes(tab: string, type: string, search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetTypes> {
    return undefined;
  }

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }
}
