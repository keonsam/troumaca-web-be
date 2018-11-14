import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetTypeClass} from "../../data/asset/asset.type.class";
import {AssignedAttribute} from "../../data/asset/assigned.attribute";
import {createAssetTypeClassRepositoryFactory} from "../../adapter/asset/asset.type.class.repository.factory";
import {AssetTypeClassRepository} from "../../repository/asset.type.class.repository";
import {shapeAssetTypeClassesResponse} from "./asset.type.class.response.shaper";
import {Result} from "../../result.success";

export class AssetTypeClassOrchestrator {

  private assetTypeClassRepository: AssetTypeClassRepository;

  constructor() {
    this.assetTypeClassRepository = createAssetTypeClassRepositoryFactory();
  }

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
    return this.assetTypeClassRepository.findAssetTypeClass(searchStr, pageSize);
  }

  getAssetTypeClasses(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.assetTypeClassRepository
      .getAssetTypeClasses(number, size, sort)
      .pipe(flatMap(value => {
        return this.assetTypeClassRepository
          .getAssetTypeClassCount()
          .pipe(map(count => {
            const shapeAssetTypeClassesResp = shapeAssetTypeClassesResponse("assetTypeClasses", value, number, size, value.length, count, sort);
            return new Result(false, "", shapeAssetTypeClassesResp);
          }));
      }));
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.getAssetTypeClassById(assetTypeClassId);
  }

  saveAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.saveAssetTypeClass(assetTypeClass, assignedAttributes);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttributes);
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

}
