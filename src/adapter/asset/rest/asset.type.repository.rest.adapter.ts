import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import {AssetType} from "../../../data/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import { AssetTypes } from "../../../data/asset/asset.types";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetTypeRequest } from "../../../graphql/asset/dto/asset.type.request";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
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
