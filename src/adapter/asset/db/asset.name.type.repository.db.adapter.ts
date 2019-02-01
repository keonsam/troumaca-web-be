import {AssetNameTypeRepository} from "../../../repository/asset.name.type.repository";
import {AssetNameType} from "../../../data/asset/asset.name.type";
import {Observable} from "rxjs";

export class AssetNameTypeRepositoryNeDbAdapter implements AssetNameTypeRepository {
  deleteAssetNameType(assetId: string): Observable<number> {
    return undefined;
  }

  findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypeById(assetId: string): Observable<AssetNameType> {
    return undefined;
  }

  getAssetNameTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetNameType[]> {
    return undefined;
  }

}