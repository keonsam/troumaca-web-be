import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import { AssetTypes } from "../data/asset/asset.types";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetTypeInput } from "../graphql/asset/dto/asset.type.input";

export interface AssetTypeRepository {

  addAssetType(assetType: AssetTypeInput, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  updateAssetType(assetTypeId: string, assetType: AssetType, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetType(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  getAssetTypes(tab?: string, search?: string, headerOptions?: HeaderBaseOptions): Observable<AssetTypes>;

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

}
