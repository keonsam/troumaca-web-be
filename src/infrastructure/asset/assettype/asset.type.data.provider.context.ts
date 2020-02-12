import {AssetTypeDataProvider} from "../../../port/asset.type.data.provider";
import {AssetTypeRequest} from "../../../domain/model/asset/request/asset.type.request";
import {HeaderBaseOptions} from "../../../header.base.options";
import {Observable} from "rxjs";
import {AssetType} from "../../../domain/model/asset/asset.type";
import {Affect} from "../../../domain/model/affect";
import {AssetTypes} from "../../../domain/model/asset/asset.types";
import {createAssetTypeDataProvider} from "./asset.type.data.provider.factory";

export class AssetTypeDataProviderContext implements AssetTypeDataProvider {

  private assetTypeDataProvider: AssetTypeDataProvider;

  constructor(assetTypeDataProvider?: AssetTypeDataProvider) {
    if (assetTypeDataProvider != null) {
      this.assetTypeDataProvider = assetTypeDataProvider;
    } else {
      this.assetTypeDataProvider = createAssetTypeDataProvider()
    }
  }

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.addAssetType(assetType, headerOptions);
  }

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.addAssetTypeRoot(assetType, headerOptions);
  }

  deleteAssetType(assetTypeId: string, version: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return this.assetTypeDataProvider.deleteAssetType(assetTypeId, version, headerOptions);
  }

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeDataProvider.findAssetTypes(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.getAssetTypeById(assetTypeId, headerOptions);
  }

  getAssetTypes(pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeDataProvider.getAssetTypes(pageNumber, pageSize, headerOptions);
  }

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return this.assetTypeDataProvider.updateAssetType(assetTypeId, assetType, headerOptions);
  }

}