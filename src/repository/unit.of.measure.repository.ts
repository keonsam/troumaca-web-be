import { UnitOfMeasure } from "../data/unit-of-measure/unit.of.measure";
import { Observable } from "rxjs/Observable";

export interface UnitOfMeasureRepository {
  findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure>;

}