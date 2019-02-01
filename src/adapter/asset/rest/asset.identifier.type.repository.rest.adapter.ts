import {AssetIdentifierTypeRepository} from "../../../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import {Observable} from "rxjs";

export class AssetIdentifierTypeRepositoryRestAdapter implements AssetIdentifierTypeRepository {
  deleteAssetIdentifierType(assetId: string): Observable<number> {
    return undefined;
  }

  findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypeById(assetId: string): Observable<AssetIdentifierType> {
    return undefined;
  }

  getAssetIdentifierTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetIdentifierType[]> {
    return undefined;
  }
}