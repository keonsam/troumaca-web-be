import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import {AssetType} from "../../../data/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import { AssetTypes } from "../../../data/asset/asset.types";
import { HeaderBaseOptions } from "../../../header.base.options";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
  addAssetType(assetType: AssetType, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
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

  getAssetTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetTypes> {
    return undefined;
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }
}
