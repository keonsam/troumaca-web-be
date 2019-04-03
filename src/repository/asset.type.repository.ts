import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { AssetTypes } from "../data/asset/asset.types";

export interface AssetTypeRepository {

  addAssetType(assetType: AssetType, headerOptions?: any): Observable<AssetType>;

  updateAssetType(assetTypeId: string, assetType: AssetType, headerOptions?: any): Observable<Affect>;

  deleteAssetType(assetTypeId: string, headerOptions?: any): Observable<Affect>;

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]>;

  getAssetTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<AssetTypes>;

  getAssetTypeById(assetTypeId: string, headerOptions?: any): Observable<AssetType>;

}
