import {UnitOfMeasureSystemRepository} from "../../repository/unit.of.measure.system.repository";
import {UnitOfMeasureSystem} from "../../data/unit-of-measure/unit.of.measure.system";
import {Observable} from "rxjs";

export class UnitOfMeasureSystemRepositoryRestAdapter implements UnitOfMeasureSystemRepository {
  findUnitOfMeasureSystem(searchStr: string, pageSize: number): Observable<UnitOfMeasureSystem[]> {
    return undefined;
  }

  getUnitOfMeasureSystemById(unitOfMeasureSystemId: string): Observable<UnitOfMeasureSystem> {
    return undefined;
  }

}