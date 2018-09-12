import { createAssetTypeRepository } from "../adapter/asset/asset.type.repository.factory";
import { AssetTypeRepository } from "../repository/asset.type.repository";
import { Observable } from "rxjs/Observable";
import { AssetType } from "../data/asset/asset.type";
import { Result } from "../result.success";
import { getSortOrderOrDefault } from "../sort.order.util";
import { shapeAssetTypesResponse } from "./asset.type.response.shaper";
import { Value } from "../data/asset/value";
import { AssetTypeResponse } from "../data/asset/asset.type.response";

export class AssetTypeOrchestrator {

  private assetTypeRepository: AssetTypeRepository;

  constructor(options?: any) {
    this.assetTypeRepository = createAssetTypeRepository(options);
  }

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageSize);
  }

  getAssetTypes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.assetTypeRepository
      .getAssetTypes(number, size, sort)
      .switchMap(assetTypes => {
        return this.assetTypeRepository
            .getAssetTypeCount()
            .map(count => {
              const shapeAssetTypesResp: any = shapeAssetTypesResponse(assetTypes, number, size, assetTypes.length, count, sort);
              return new Result<any>(false, "assetTypes", shapeAssetTypesResp);
            });
      });
  }

  getAssetTypeById(assetTypeId: string): Observable<AssetTypeResponse> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId);
  }

  saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
      return this.assetTypeRepository.saveAssetType(assetType, values);
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
      return this.assetTypeRepository.updateAssetType(assetTypeId, assetType, values);
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
      return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

}
