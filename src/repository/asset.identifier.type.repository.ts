import { AssetIdentifierType } from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";

export interface AssetIdentifierTypeRepository {

  findAssetIdentifierTypes(searchStr: string, pageSize: number, options: any): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypeCount(options: any): Observable<number>;

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, options: any): Observable<AssetIdentifierType>;

  saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options: any): Observable<AssetIdentifierType>;

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, options: any): Observable<number>;

  deleteAssetIdentifierType(assetIdentifierTypeId: string, options: any): Observable<number>;

}
