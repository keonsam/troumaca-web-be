import {AssetType} from "../../data/asset/asset.type";
import {Observable} from "rxjs";
import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {createAssetTypeRepository} from "../../adapter/asset/asset.type.repository.factory";
import {Sort} from "../../util/sort";
import { map } from "rxjs/operators";
import { AssetTypes } from "../../data/asset/asset.types";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";
import { AssetTypeInput } from "../../graphql/asset/dto/asset.type.input";

export class AssetTypeOrchestrator {

  private assetTypeRepository: AssetTypeRepository;

  constructor(options?: RepositoryKind) {
    this.assetTypeRepository = createAssetTypeRepository(options);
  }

  addAssetType(assetType: AssetTypeInput, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType, headerOptions);
  }

  findAssetTypes( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypes(search?: string, headerOptions?: HeaderBaseOptions): Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(search, headerOptions);
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, headerOptions?: HeaderBaseOptions): Observable<number> {
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
