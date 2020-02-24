import {AssetType} from "../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import { HeaderBaseOptions } from "../header.base.options";
import { AssetTypeRequest } from "../domain/model/asset/request/asset.type.request";
import {AssetTypeCompositeRequest} from "../domain/model/asset/request/asset.type.composite.request";
import {CreateAssetTypeCompositeResponse} from "../domain/model/asset/dto/create.asset.type.composite.response";

export interface AssetTypeDataProvider {

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  addAssetTypeRootComposite(assetTypeComposite: AssetTypeCompositeRequest, headerOptions?: HeaderBaseOptions): Observable<CreateAssetTypeCompositeResponse>;

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  addAssetTypeComposite(assetTypeComposite: AssetTypeCompositeRequest, headerOptions?: HeaderBaseOptions): Observable<CreateAssetTypeCompositeResponse>;

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  queryAssetTypeById(query: string, headerOptions?: HeaderBaseOptions): Observable<AssetType>;

  getAssetTypes(pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  queryAssetTypes(query: string, headerOptions?: HeaderBaseOptions): Observable<AssetType[]>;

  deleteAssetType(assetTypeId: string, version: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect>;

}
