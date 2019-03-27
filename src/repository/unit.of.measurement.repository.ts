import {UnitOfMeasurement} from "../data/unit-of-measurement/unit.of.measurement";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import { UnitOfMeasurements } from "../data/unit-of-measurement/unit.of.measurements";

export interface UnitOfMeasurementRepository {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<UnitOfMeasurement>;

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<Affect>;

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: any): Observable<Affect>;

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurement[]>;

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<UnitOfMeasurements>;

  getUnitOfMeasurementCount(headerOptions?: any): Observable<number>;

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: any): Observable<UnitOfMeasurement>;
}
