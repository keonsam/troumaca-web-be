import { UnitOfMeasureRepository } from "../unit.of.measure.repository";
import { Observable } from "rxjs";
import { UnitOfMeasure } from "../unit.of.measure";

export class UnitOfMeasureRepositoryRestAdapter implements UnitOfMeasureRepository {
    findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
        return null;
    }

    getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
        return null;
    }

}