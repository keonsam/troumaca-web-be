import { AssetIdentifierTypeRepository } from "../../repository/asset.identifier.type.repository";
import { AssetIdentifierType} from "../../data/asset/asset.identifier.type";
import { Observable } from "rxjs";

export class AssetIdentifierTypeRepositoryRestAdapter implements AssetIdentifierTypeRepository {

  constructor() {
  }

  findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetIdentifierTypeById(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
    return undefined;
  }

  saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
    return undefined;
  }

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType): Observable<number> {
    return undefined;
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
    return undefined;
  }

}
