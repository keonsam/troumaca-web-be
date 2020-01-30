import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import { AssetTypes } from "../data/asset/asset.types";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetTypeRequest } from "../graphql/asset/dto/asset.type.request";

export interface AssetTypeRepository {

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetType(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  getAssetTypes(tab: string, type: string, search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetTypes>;

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

}
