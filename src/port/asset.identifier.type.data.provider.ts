import {AssetIdentifierType} from "../domain/model/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetIdentifierTypes } from "../domain/model/asset/asset.identifier.types";

export interface AssetIdentifierTypeDataProvider {

  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType>;

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteAssetIdentifierType(assetIdentifierTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType[]>;

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierTypes>;

  // getAssetIdentifierTypeCount(headerOptions?: HeaderBaseOptions): Observable<number>;

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType>;

}
