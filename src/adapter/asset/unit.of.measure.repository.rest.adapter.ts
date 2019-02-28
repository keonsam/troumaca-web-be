import { UnitOfMeasure} from "../../data/unit-of-measure/unit.of.measure";
import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import { Observable } from "rxjs";

export class UnitOfMeasureRepositoryRestAdapter implements UnitOfMeasureRepository {

  constructor() {
  }

  findUnitOfMeasures(searchStr: string, pageSize: number, options: any): Observable<UnitOfMeasure[]> {
    return undefined;
  }

  getUnitOfMeasures(pageNumber: number, pageSize: number, order: string, options: any): Observable<UnitOfMeasure[]> {
    return undefined;
  }

  getUnitOfMeasureCount(options: any): Observable<number> {
    return undefined;
  }

  getUnitOfMeasureById(unitOfMeasureId: string, options: any): Observable<UnitOfMeasure> {
    return undefined;
  }

  saveUnitOfMeasure(unitOfMeasure: UnitOfMeasure, options: any): Observable<UnitOfMeasure> {
    return undefined;
  }

  updateUnitOfMeasure(unitOfMeasureId: string, unitOfMeasure: UnitOfMeasure, options: any): Observable<number> {
    return undefined;
  }

  deleteUnitOfMeasure(unitOfMeasureId: string, options: any): Observable<number> {
    return undefined;
  }

}
