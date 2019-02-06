import { AssetIdentifierType } from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";

export interface AssetIdentifierTypeRepository {

  findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypeCount(): Observable<number>;

  getAssetIdentifierTypeById(assetIdentifierTypeId: string): Observable<AssetIdentifierType>;

  saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType>;

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType): Observable<number>;

  deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number>;

}
