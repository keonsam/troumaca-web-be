import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import { Observable } from "rxjs/Observable";
import { UnitOfMeasure } from "../../data/unit-of-measure/unit.of.measure";

export class UnitOfMeasureRepositoryRestAdapter implements UnitOfMeasureRepository {
    findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
        return null;
    }

    getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
        return null;
    }

}