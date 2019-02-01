import {UnitOfMeasureSystem} from "../data/unit-of-measure/unit.of.measure.system";
import {Observable} from "rxjs";

export interface UnitOfMeasureSystemRepository {
  findUnitOfMeasureSystem(searchStr: string, pageSize: number): Observable<UnitOfMeasureSystem[]>;

  getUnitOfMeasureSystemById(unitOfMeasureSystemId: string): Observable<UnitOfMeasureSystem>;

}
