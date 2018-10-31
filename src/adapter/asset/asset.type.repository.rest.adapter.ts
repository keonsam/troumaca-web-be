import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {AssetType} from "../../data/asset/asset.type";
import {Value} from "../../data/asset/value";
import {AssetTypeResponse} from "../../data/asset/asset.type.response";
import {Observable} from "rxjs";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string): Observable<AssetTypeResponse> {
    return undefined;
  }

  saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
    return undefined;
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    return undefined;
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return undefined;
  }
}