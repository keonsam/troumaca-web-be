import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import {AssetType} from "../../../data/asset/asset.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import { AssetTypes } from "../../../data/asset/asset.types";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
  addAssetType(assetType: AssetType, headerOptions?: any): Observable<AssetType> {
    return undefined;
  }

  deleteAssetType(assetTypeId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: any): Observable<AssetType> {
    return undefined;
  }

  getAssetTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<AssetTypes> {
    return undefined;
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}
