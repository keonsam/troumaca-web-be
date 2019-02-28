import { UnitOfMeasure } from "../data/unit-of-measure/unit.of.measure";
import {Observable} from "rxjs";

export interface UnitOfMeasureRepository {

  findUnitOfMeasures(searchStr: string, pageSize: number, options: any): Observable<UnitOfMeasure[]>;

  getUnitOfMeasures(pageNumber: number, pageSize: number, order: string, options: any): Observable<UnitOfMeasure[]>;

  getUnitOfMeasureCount(options: any): Observable<number>;

  getUnitOfMeasureById(unitOfMeasureId: string, options: any): Observable<UnitOfMeasure>;

  saveUnitOfMeasure(unitOfMeasure: UnitOfMeasure, options: any): Observable<UnitOfMeasure>;

  updateUnitOfMeasure(unitOfMeasureId: string, unitOfMeasure: UnitOfMeasure, options: any): Observable<number>;

  deleteUnitOfMeasure(unitOfMeasureId: string, options: any): Observable<number>;

}
