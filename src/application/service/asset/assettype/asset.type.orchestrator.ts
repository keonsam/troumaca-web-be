import {AssetType} from "../../../../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {AssetTypeDataProvider} from "../../../../port/asset.type.data.provider";
import {createAssetTypeDataProvider} from "../../../../infrastructure/asset/asset.type.data.provider.factory";
import { map } from "rxjs/operators";
import { AssetTypes } from "../../../../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RepositoryKind } from "../../../../repository.kind";
import { AssetTypeRequest } from "../../../../domain/model/asset/request/asset.type.request";

export class AssetTypeOrchestrator {

  private assetTypeRepository: AssetTypeDataProvider;

  constructor(options?: RepositoryKind) {
    this.assetTypeRepository = createAssetTypeDataProvider(options);
  }

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType, headerOptions);
  }

  findAssetTypes( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypes(tab: string, type: string, search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(tab, type, search, pageNumber, pageSize, headerOptions);
  }

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType, headerOptions)
        .pipe(map( aff => aff.affected));
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId, headerOptions);
  }

  deleteAssetType(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId, headerOptions)
        .pipe(map(aff => aff.affected));
  }

}
