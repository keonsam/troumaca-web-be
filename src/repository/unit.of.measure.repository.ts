import { UnitOfMeasure } from "../data/unit-of-measure/unit.of.measure";
import {Observable} from "rxjs";

export interface UnitOfMeasureRepository {

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;

  getUnitOfMeasures(pageNumber: number, pageSize: number, order: string): Observable<UnitOfMeasure[]>;

  getUnitOfMeasureCount(): Observable<number>;

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure>;

  saveUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure>;

  updateUnitOfMeasure(unitOfMeasureId: string, unitOfMeasure: UnitOfMeasure): Observable<number>;

  deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number>;

}
