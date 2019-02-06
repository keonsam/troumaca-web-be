import { AssetNameTypeRepository } from "../../repository/asset.name.type.repository";
import { AssetNameType} from "../../data/asset/asset.name.type";
import { Observable } from "rxjs";

export class AssetNameTypeRepositoryRestAdapter implements AssetNameTypeRepository {

  constructor() {
  }

  findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetNameTypeById(assetNameTypeId: string): Observable<AssetNameType> {
    return undefined;
  }

  saveAssetNameType(assetNameType: AssetNameType): Observable<AssetNameType> {
    return undefined;
  }

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType): Observable<number> {
    return undefined;
  }

  deleteAssetNameType(assetNameTypeId: string): Observable<number> {
    return undefined;
  }

}
