import {AssetIdentifierType} from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";

export interface AssetIdentifierTypeRepository {

  findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypeCount(): Observable<number>;

  getAssetIdentifierTypeById(assetId: string): Observable<AssetIdentifierType>;

  deleteAssetIdentifierType(assetId: string): Observable<number>;
}
