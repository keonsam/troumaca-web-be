import { createUnitOfMeasureRepositoryFactory} from "../adapter/asset/unit.of.measure.repository.factory";
import {shapeUnitOfMeasuresResponse} from "./unit.of.measure.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import { UnitOfMeasureRepository } from "../repository/unit.of.measure.repository";
import { UnitOfMeasure } from "../data/unit-of-measure/unit.of.measure";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class UnitOfMeasureOrchestrator {

    private unitOfMeasureRepository: UnitOfMeasureRepository;

    constructor(options?: any) {
        this.unitOfMeasureRepository = createUnitOfMeasureRepositoryFactory(options);
    }

    findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
        return this.unitOfMeasureRepository.findUnitOfMeasures(searchStr, pageSize);
    }

    getUnitOfMeasures(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.unitOfMeasureRepository
            .getUnitOfMeasures(number, size, sort)
            .pipe(switchMap((unitOfMeasures: UnitOfMeasure[]) => {
                return this.unitOfMeasureRepository
                    .getUnitOfMeasureCount()
                    .pipe(map((count: number) => {
                        const shapeUnitOfMeasuresResp: any = shapeUnitOfMeasuresResponse(unitOfMeasures, number, size, unitOfMeasures.length, count, sort);
                        return new Result<any>(false, "unitOfMeasures", shapeUnitOfMeasuresResp);
                    }));
            }));
    }

    getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
        return this.unitOfMeasureRepository.getUnitOfMeasureById(unitOfMeasureId);
    }

    saveUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> {
        return this.unitOfMeasureRepository.saveUnitOfMeasure(unitOfMeasure);
    }

    updateUnitOfMeasure(unitOfMeasureId: string, unitOfMeasure: UnitOfMeasure): Observable<number> {
        return this.unitOfMeasureRepository.updateUnitOfMeasure(unitOfMeasureId, unitOfMeasure);
    }

    deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number> {
        return this.unitOfMeasureRepository.deleteUnitOfMeasure(unitOfMeasureId);
    }

}

