import { AssetNameTypeRepository } from "../../repository/asset.name.type.repository";
import { AssetNameType} from "../../data/asset/asset.name.type";
import { Observable } from "rxjs";

export class AssetNameTypeRepositoryRestAdapter implements AssetNameTypeRepository {

  constructor() {
  }

  findAssetNameTypes(searchStr: string, pageSize: number, options: any): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypeCount(options: any): Observable<number> {
    return undefined;
  }

  getAssetNameTypeById(assetNameTypeId: string, options: any): Observable<AssetNameType> {
    return undefined;
  }

  saveAssetNameType(assetNameType: AssetNameType, options: any): Observable<AssetNameType> {
    return undefined;
  }

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, options: any): Observable<number> {
    return undefined;
  }

  deleteAssetNameType(assetNameTypeId: string, options: any): Observable<number> {
    return undefined;
  }

}
