import {UnitOfMeasureDimensionRepository} from "../../repository/unit.of.measure.dimension.repository";
import {UnitOfMeasureDimension} from "../../data/unit-of-measure/unit.of.measure.dimension";
import {Observable} from "rxjs";

export class UnitOfMeasureDimensionRepositoryRestAdapter implements UnitOfMeasureDimensionRepository {
  findUnitOfMeasureDimension(searchStr: string, pageSize: number): Observable<UnitOfMeasureDimension[]> {
    return undefined;
  }

  getUnitOfMeasureDimensionById(unitOfMeasureDimensionId: string): Observable<UnitOfMeasureDimension> {
    return undefined;
  }

}