import {UnitOfMeasurement} from "../domain/model/unit-of-measurement/unit.of.measurement";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import { UnitOfMeasurements } from "../domain/model/unit-of-measurement/unit.of.measurements";
import { HeaderBaseOptions } from "../header.base.options";

export interface UnitOfMeasurementDataProvider {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement>;

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: HeaderBaseOptions): Observable<Affect>;

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement[]>;

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurements>;

  // getUnitOfMeasurementCount(headerOptions?: HeaderBaseOptions): Observable<number>;

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement>;
}
