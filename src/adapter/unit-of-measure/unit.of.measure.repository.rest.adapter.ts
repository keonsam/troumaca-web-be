import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import { UnitOfMeasure } from "../../data/unit-of-measure/unit.of.measure";
import { Observable } from "rxjs";

export class UnitOfMeasureRepositoryRestAdapter implements UnitOfMeasureRepository {
    findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
        return null;
    }

    getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
        return null;
    }

}