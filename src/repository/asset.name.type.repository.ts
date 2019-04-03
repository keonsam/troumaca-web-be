import {AssetNameType} from "../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetNameTypes } from "../data/asset/asset.name.types";

export interface AssetNameTypeRepository {

  addAssetNameType(assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<AssetNameType>;

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<number>;

  deleteAssetNameType(assetNameTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetNameType[]>;

  getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetNameTypes>;

  getAssetNameTypeById(assetNameTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetNameType>;

}
