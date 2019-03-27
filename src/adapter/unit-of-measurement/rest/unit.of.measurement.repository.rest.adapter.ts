import {UnitOfMeasurementRepository} from "../../../repository/unit.of.measurement.repository";
import {UnitOfMeasurement} from "../../../data/unit-of-measurement/unit.of.measurement";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import { UnitOfMeasurements } from "../../../data/unit-of-measurement/unit.of.measurements";

export class UnitOfMeasurementRepositoryRestAdapter implements UnitOfMeasurementRepository {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<UnitOfMeasurement> {
    return undefined;
  }

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurement[]> {
    return undefined;
  }

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: any): Observable<UnitOfMeasurement> {
    return undefined;
  }

  getUnitOfMeasurementCount(headerOptions?: any): Observable<number> {
    return undefined;
  }

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<UnitOfMeasurements> {
    return undefined;
  }

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}
