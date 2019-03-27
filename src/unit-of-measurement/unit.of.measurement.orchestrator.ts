import {Observable} from "rxjs";
import {UnitOfMeasurementRepository} from "../repository/unit.of.measurement.repository";
import {createUnitOfMeasurementRepository} from "../adapter/unit-of-measurement/unit.of.measurement.repository.factory";
import {Affect} from "../data/affect";
import {UnitOfMeasurement} from "../data/unit-of-measurement/unit.of.measurement";
import {Page} from "../util/page";
import {Sort} from "../util/sort";
import { map } from "rxjs/operators";
import { UnitOfMeasurements } from "../data/unit-of-measurement/unit.of.measurements";

export class UnitOfMeasurementOrchestrator {

  private unitOfMeasurementRepository: UnitOfMeasurementRepository;

  constructor(options?: any) {
    this.unitOfMeasurementRepository = createUnitOfMeasurementRepository(options);
  }

  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<UnitOfMeasurement> {
    return this.unitOfMeasurementRepository.addUnitOfMeasurement(unitOfMeasurement, headerOptions);
  }

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurement[]> {
    return this.unitOfMeasurementRepository.findUnitOfMeasurements(searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<UnitOfMeasurements> {
    return this.unitOfMeasurementRepository.getUnitOfMeasurements(pageNumber, pageSize, sort, headerOptions);
  }

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<number> {
    return this.unitOfMeasurementRepository.updateUnitOfMeasurement(unitOfMeasureId, unitOfMeasurement, headerOptions)
        .pipe(map(aff => aff.affected));
  }

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: any): Observable<UnitOfMeasurement> {
    return this.unitOfMeasurementRepository.getUnitOfMeasurementById(unitOfMeasurementId, headerOptions);
  }

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: any): Observable<number> {
    return this.unitOfMeasurementRepository.deleteUnitOfMeasurement(unitOfMeasurementId, headerOptions)
        .pipe(map(aff => aff.affected));
  }

}
