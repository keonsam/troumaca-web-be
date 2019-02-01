import {UnitOfMeasureDimension} from "../data/unit-of-measure/unit.of.measure.dimension";
import {Observable} from "rxjs";

export interface UnitOfMeasureDimensionRepository {
  findUnitOfMeasureDimension(searchStr: string, pageSize: number): Observable<UnitOfMeasureDimension[]>;

  getUnitOfMeasureDimensionById(unitOfMeasureDimensionId: string): Observable<UnitOfMeasureDimension>;

}
