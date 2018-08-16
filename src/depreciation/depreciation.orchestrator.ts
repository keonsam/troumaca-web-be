import { createDepreciationRepositoryFactory } from "./depreciation.repository.factory";
import { shapeDepreciationResponse } from "./depreciation.response.shaper";
import { getSortOrderOrDefault } from "../sort.order.util";
import { DepreciationRepository } from "./depreciation.repository";
import { Observable } from "rxjs/Observable";
import { Depreciation } from "./depreciation";
import { Result } from "../result.success";
import { Asset } from "../asset-type/asset/asset";
import { DepreciationMethod } from "./depreciation.method";

export class DepreciationOrchestrator {

  private depreciationRepository: DepreciationRepository;

  constructor(options?: any) {
    this.depreciationRepository = createDepreciationRepositoryFactory(options);
  }

    getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
      return this.depreciationRepository.getDepreciableAssets(searchStr, pageSize);
    }

    getBookDepreciationArr(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
       const sort: string = getSortOrderOrDefault(field, direction);
       return this.depreciationRepository
           .getBookDepreciationArr(number, size, sort)
           .switchMap((depreciationArr: Depreciation[]) => {
               return this.depreciationRepository
                   .getDepreciationCount()
                   .map(count => {
                       const shapeDepreciationResp: any = shapeDepreciationResponse(depreciationArr, number, size, depreciationArr.length, count, sort);
                       return new Result<any>(false, "depreciation", shapeDepreciationResp);
                   });
           });
   }

    getDepreciationById(depreciationId: string): Observable<Depreciation> {
        return this.depreciationRepository.getDepreciationById(depreciationId);
    }

    saveDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
        return this.depreciationRepository.saveDepreciation(depreciation, type);
    }

    updateDepreciation(depreciationId: string, depreciation: Depreciation): Observable<number> {
        return this.depreciationRepository.updateDepreciation(depreciationId, depreciation);
    }

    deleteDepreciation(depreciationId: string): Observable<number> {
        return this.depreciationRepository.deleteDepreciation(depreciationId);
    }

    getDepreciationMethod(): Observable<DepreciationMethod[]> {
      return this.depreciationRepository.getDepreciationMethod();
    }

}

