import {createDepreciationDataProvider} from "../../../../infrastructure/asset/depreciation.data.provider.factory";
import {getSortOrderOrDefault} from "../../../../sort.order.util";
import {DepreciationDataProvider} from "../../../../port/depreciation.data.provider";
import {Depreciation} from "../../../../domain/model/asset/depreciation";
import {Observable} from "rxjs";
import {Result} from "../../../../result.success";
import {Asset} from "../../../../domain/model/asset/asset";
import {DepreciationMethod} from "../../../../domain/model/asset/depreciation.method";
import {DepreciationSystem} from "../../../../domain/model/asset/depreciation.system";
import {PropertyClass} from "../../../../domain/model/asset/property.class";

export class DepreciationOrchestrator {

  private depreciationRepository: DepreciationDataProvider;

  constructor(options?: any) {
    this.depreciationRepository = createDepreciationDataProvider(options);
  }

  getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.depreciationRepository.getDepreciableAssets(searchStr, pageSize);
  }

  getBookDepreciationArr(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    // return this.depreciationRepository
    //     .getBookDepreciationArr(number, size, sort)
    //     .pipe(switchMap((depreciationArr: Depreciation[]) => {
    //         return this.depreciationRepository
    //             .getDepreciationCount()
    //             .pipe(map(count => {
    //                 // const shapeDepreciationResp: any = shapeDepreciationResponse(depreciationArr, number, size, depreciationArr.length, count, sort);
    //                 // return new Result<any>(false, "depreciation", shapeDepreciationResp);
    //             }));
    //     }));
    return undefined;
  }

  getTaxDepreciationArr(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    // return this.depreciationRepository
    //     .getTaxDepreciationArr(number, size, sort)
    //     .pipe(switchMap((depreciationArr: Depreciation[]) => {
    //         return this.depreciationRepository
    //             .getTaxDepreciationCount()
    //             .pipe(map(count => {
    //                 // const shapeDepreciationResp: any = shapeDepreciationResponse(depreciationArr, number, size, depreciationArr.length, count, sort);
    //                 // return new Result<any>(false, "depreciation", shapeDepreciationResp);
    //             }));
    //     }));
    return undefined;
  }

  getDepreciationById(depreciationId: string, type: string): Observable<Depreciation> {
    return this.depreciationRepository.getDepreciationById(depreciationId, type);
  }

  saveDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
    return this.depreciationRepository.saveDepreciation(depreciation, type);
  }

  updateDepreciation(depreciationId: string, depreciation: Depreciation, type: string): Observable<number> {
    return this.depreciationRepository.updateDepreciation(depreciationId, depreciation, type);
  }

  deleteDepreciation(depreciationId: string, type: string): Observable<number> {
    return this.depreciationRepository.deleteDepreciation(depreciationId, type);
  }

  getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]> {
    return this.depreciationRepository.getDepreciationMethod(type, system);
  }

  getDepreciationSystems(): Observable<DepreciationSystem[]> {
    return this.depreciationRepository.getDepreciationSystems();
  }

  getPropertyClasses(system?: string): Observable<PropertyClass[]> {
    return this.depreciationRepository.getPropertyClasses(system);
  }

}

