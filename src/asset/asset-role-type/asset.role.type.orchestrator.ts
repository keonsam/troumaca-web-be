import {AssetRoleType} from "../../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {map, switchMap} from "rxjs/operators";
import {shapeAssetRoleTypesResponse} from "./asset.type.response.shaper";
import {createAssetRoleTypeRepositoryFactory} from "../../adapter/asset/asset.role.type.repository.factory";
import {Affect} from "../../data/affect";

export class AssetRoleTypeOrchestrator {

  private assetRoleTypeRepository: AssetRoleTypeRepository;

  constructor(options?: any) {
    this.assetRoleTypeRepository = createAssetRoleTypeRepositoryFactory(options);
  }

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?:any): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.addAssetRoleType(assetRoleType, headerOptions);
  }

  findAssetRoleTypes(searchStr: string, pageSize: number, headerOptions?:any): Observable<AssetRoleType[]> {
    return this.assetRoleTypeRepository.findAssetRoleTypes(searchStr, pageSize, headerOptions);
  }

  getAssetRoleTypes(number: number, size: number, field: string, direction: string, headerOptions?:any): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.assetRoleTypeRepository
      .getAssetRoleTypes(number, size, sort, headerOptions)
      .pipe(switchMap(assetRoleTypes => {
        return this.assetRoleTypeRepository
          .getAssetRoleTypeCount()
          .pipe(map(count => {
            const shapeAssetRoleTypesResp: any = shapeAssetRoleTypesResponse(assetRoleTypes, number, size, assetRoleTypes.length, count, sort);
            return new Result<any>(false, "assetRoleTypes", shapeAssetRoleTypesResp);
          }));
      }));
  }

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?:any): Observable<Affect> {
    return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleType, headerOptions);
  }

  getAssetRoleTypeById(assetRoleTypeId: string, headerOptions?:any): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId, headerOptions);
  }

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?:any): Observable<Affect> {
    return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId, headerOptions);
  }

}