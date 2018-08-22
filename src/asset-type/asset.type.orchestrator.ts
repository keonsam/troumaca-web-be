import { createAssetTypeRepository } from "./asset.type.repository.factory";
import { AssetTypeRepository } from "./asset.type.repository";
import { Observable } from "rxjs";
import { AssetType } from "./asset.type";
import { Result } from "../result.success";
import { getSortOrderOrDefault } from "../sort.order.util";
import { shapeAssetTypesResponse } from "./asset.type.response.shaper";
import { Value } from "./value/value";
import { AssetTypeResponse } from "./asset.type.response";
import { switchMap, map } from "rxjs/operators";

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
      .pipe(switchMap(assetTypes => {
        return this.assetTypeRepository
            .getAssetTypeCount()
            .pipe(map(count => {
              const shapeAssetTypesResp: any = shapeAssetTypesResponse(assetTypes, number, size, assetTypes.length, count, sort);
              return new Result<any>(false, "assetTypes", shapeAssetTypesResp);
            }));
      }));
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
