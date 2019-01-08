import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetClassification} from "../../data/asset/asset.classification";
import {AssignedAttribute} from "../../data/asset/assigned.attribute";
import {createAssetClassificationRepositoryFactory} from "../../adapter/asset/asset.classification.repository.factory";
import {AssetClassificationRepository} from "../../repository/asset.classification.repository";
import {shapeAssetTypeClassesResponse} from "./asset.classification.response.shaper";
import {Result} from "../../result.success";

export class AssetClassificationOrchestrator {

  private assetClassificationRepository: AssetClassificationRepository;

  constructor() {
    this.assetClassificationRepository = createAssetClassificationRepositoryFactory();
  }

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetClassification[]> {
    return this.assetClassificationRepository.findAssetTypeClass(searchStr, pageSize);
  }

  getAssetTypeClasses(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.assetClassificationRepository
      .getAssetTypeClasses(number, size, sort)
      .pipe(flatMap(value => {
        return this.assetClassificationRepository
          .getAssetTypeClassCount()
          .pipe(map(count => {
            const shapeAssetTypeClassesResp = shapeAssetTypeClassesResponse("assetTypeClasses", value, number, size, value.length, count, sort);
            return new Result(false, "", shapeAssetTypeClassesResp);
          }));
      }));
  }

  getAssetTypeClass(assetTypeClassId: string): Observable<AssetClassification> {
    return this.assetClassificationRepository.getAssetTypeClassById(assetTypeClassId);
  }

  addAssetClassification(assetClassification: AssetClassification, options?: any): Observable<AssetClassification> {
    return this.assetClassificationRepository.addAssetClassification(assetClassification, options);
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetClassification, assignedAttributes: AssignedAttribute[]): Observable<number> {
    return this.assetClassificationRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttributes);
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return this.assetClassificationRepository.deleteAssetTypeClass(assetTypeClassId);
  }

}
