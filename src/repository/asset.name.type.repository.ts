import {AssetNameType} from "../data/asset/asset.name.type";
import {Observable} from "rxjs";

export interface AssetNameTypeRepository {

  findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]>;

  getAssetNameTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetNameType[]>;

  getAssetNameTypeCount(): Observable<number>;

  getAssetNameTypeById(assetId: string): Observable<AssetNameType>;

  deleteAssetNameType(assetId: string): Observable<number>;
}
