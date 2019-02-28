import { AssetIdentifierTypeRepository } from "../../repository/asset.identifier.type.repository";
import { AssetIdentifierType} from "../../data/asset/asset.identifier.type";
import { Observable } from "rxjs";

export class AssetIdentifierTypeRepositoryRestAdapter implements AssetIdentifierTypeRepository {

  constructor() {
  }

  findAssetIdentifierTypes(searchStr: string, pageSize: number, options: any): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypeCount(options: any): Observable<number> {
    return undefined;
  }

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, options: any): Observable<AssetIdentifierType> {
    return undefined;
  }

  saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options: any): Observable<AssetIdentifierType> {
    return undefined;
  }

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, options: any): Observable<number> {
    return undefined;
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string, options: any): Observable<number> {
    return undefined;
  }

}
