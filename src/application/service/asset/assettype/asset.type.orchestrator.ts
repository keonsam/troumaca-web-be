import {AssetType} from "../../../../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {AssetTypeDataProvider} from "../../../../port/asset.type.data.provider";
import { map } from "rxjs/operators";
// import { AssetTypes } from "../../../../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { AssetTypeRequest } from "../../../../domain/model/asset/request/asset.type.request";
import {Inject} from "typedi";
import {AssetTypeDataProviderContext} from "../../../../infrastructure/asset/assettype/asset.type.data.provider.context";
import {AssetTypeCompositeRequest} from "../../../../domain/model/asset/request/asset.type.composite.request";
import {CreateAssetTypeCompositeResponse} from "../../../../domain/model/asset/dto/create.asset.type.composite.response";

export class AssetTypeOrchestrator {

  private assetTypeDataProvider: AssetTypeDataProvider;

  constructor(@Inject() assetTypeDataProvider?: AssetTypeDataProvider) {
    if (assetTypeDataProvider != null) {
      this.assetTypeDataProvider = assetTypeDataProvider;
    } else {
      this.assetTypeDataProvider =  new AssetTypeDataProviderContext()
    }
  }

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.addAssetTypeRoot(assetType, headerOptions);
  }

  addAssetTypeRootComposite(assetType: AssetTypeCompositeRequest, headerOptions?: HeaderBaseOptions): Observable<CreateAssetTypeCompositeResponse> {
    return this.assetTypeDataProvider.addAssetTypeRootComposite(assetType, headerOptions);
  }

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.addAssetType(assetType, headerOptions);
  }

  addAssetTypeComposite(assetType: AssetTypeCompositeRequest, headerOptions?: HeaderBaseOptions): Observable<CreateAssetTypeCompositeResponse> {
    return this.assetTypeDataProvider.addAssetTypeComposite(assetType, headerOptions);
  }

  findAssetTypes( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeDataProvider.findAssetTypes(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypes(pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeDataProvider.getAssetTypes(pageNumber, pageSize, headerOptions);
  }

  queryAssetTypes(query: string, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeDataProvider.queryAssetTypes(query, headerOptions);
  }

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetTypeDataProvider.updateAssetType(assetTypeId, assetType, headerOptions)
        .pipe(map( aff => aff.affected));
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.getAssetTypeById(assetTypeId, headerOptions);
  }

  queryAssetTypeById(query: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeDataProvider.queryAssetTypeById(query, headerOptions);
  }

  deleteAssetType(assetTypeId: string, version: string, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetTypeDataProvider.deleteAssetType(assetTypeId, version, headerOptions)
        .pipe(map(aff => aff.affected));
  }

}
