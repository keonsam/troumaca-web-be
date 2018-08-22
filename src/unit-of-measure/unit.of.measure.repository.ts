import { UnitOfMeasure } from "./unit.of.measure";
import { Observable } from "rxjs";

export interface UnitOfMeasureRepository {
  findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure>;

}
