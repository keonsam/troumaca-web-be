import { UnitOfMeasure} from "../../data/unit-of-measure/unit.of.measure";
import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import { Observable } from "rxjs";

export class UnitOfMeasureRepositoryRestAdapter implements UnitOfMeasureRepository {

  constructor() {
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return undefined;
  }

  getUnitOfMeasures(pageNumber: number, pageSize: number, order: string): Observable<UnitOfMeasure[]> {
    return undefined;
  }

  getUnitOfMeasureCount(): Observable<number> {
    return undefined;
  }

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
    return undefined;
  }

  saveUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> {
    return undefined;
  }

  updateUnitOfMeasure(unitOfMeasureId: string, unitOfMeasure: UnitOfMeasure): Observable<number> {
    return undefined;
  }

  deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number> {
    return undefined;
  }

}
