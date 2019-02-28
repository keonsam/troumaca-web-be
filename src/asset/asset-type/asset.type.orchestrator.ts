import {createAssetTypeRepository} from "../../adapter/asset/asset.type.repository.factory";
import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {AssetType} from "../../data/asset/asset.type";
import {Observable} from "rxjs";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {shapeAssetTypesResponse} from "./asset.type.response.shaper";
import {switchMap, map} from "rxjs/operators";
import { Instance } from "../../data/asset/instance";

export class AssetTypeOrchestrator {

  private assetTypeRepository: AssetTypeRepository;

  constructor(options?: any) {
    this.assetTypeRepository = createAssetTypeRepository(options);
  }

  findAssetTypes(searchStr: string, pageSize: number, options: any): Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageSize, options);
  }

  findInstances(searchStr: string, pageSize: number, options: any): Observable<Instance[]> {
    return this.assetTypeRepository.findInstances(searchStr, pageSize, options);
  }

  getAssetTypes(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.assetTypeRepository
      .getAssetTypes(number, size, sort, options)
      .pipe(switchMap(assetTypes => {
        return this.assetTypeRepository
            .getAssetTypeCount(options)
            .pipe(map(count => {
              const shapeAssetTypesResp: any = shapeAssetTypesResponse(assetTypes, number, size, assetTypes.length, count, sort);
              return new Result<any>(false, "assetTypes", shapeAssetTypesResp);
            }));
      }));
  }

  getAssetTypeById(assetTypeId: string, options: any): Observable<AssetType> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId, options);
  }

  saveAssetType(assetType: AssetType, options: any): Observable<AssetType> {
    return this.assetTypeRepository.saveAssetType(assetType, options);
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, options: any): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType, options);
  }

  deleteAssetType(assetTypeId: string, options: any): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId, options);
  }

}
