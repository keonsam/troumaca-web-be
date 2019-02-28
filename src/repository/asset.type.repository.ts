import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import { Instance } from "../data/asset/instance";

export interface AssetTypeRepository {

  findAssetTypes(searchStr: string, pageSize: number, options: any): Observable<AssetType[]>;

  findInstances(searchStr: string, pageSize: number, options: any): Observable<Instance[]>;

  getAssetTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetType[]>;

  getAssetTypeCount(options: any): Observable<number>;

  getAssetTypeById(assetId: string, options: any): Observable<AssetType>;

  saveAssetType(assetType: AssetType, options: any): Observable<AssetType>;

  updateAssetType(assetId: string, assetType: AssetType, options: any): Observable<number>;

  deleteAssetType(assetId: string, options: any): Observable<number>;
}
