import {UnitOfMeasurementDataProvider} from "../../../port/unit.of.measurement.data.provider";
import {UnitOfMeasurement} from "../../../domain/model/unit-of-measurement/unit.of.measurement";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
// import {Page} from "../../../util/page";
import { UnitOfMeasurements } from "../../../domain/model/unit-of-measurement/unit.of.measurements";
import { HeaderBaseOptions } from "../../../header.base.options";

export class RestUnitOfMeasurementDataProvider implements UnitOfMeasurementDataProvider {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement> {
    return undefined;
  }

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement[]> {
    return undefined;
  }

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement> {
    return undefined;
  }

  // getUnitOfMeasurementCount(headerOptions?: HeaderBaseOptions): Observable<number> {
  //   return undefined;
  // }

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurements> {
    return undefined;
  }

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }
}
