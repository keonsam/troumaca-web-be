import {Observable} from "rxjs";
import {UnitOfMeasurementRepository} from "../../repository/unit.of.measurement.repository";
import {createUnitOfMeasurementRepository} from "../../adapter/unit-of-measurement/unit.of.measurement.repository.factory";
import {UnitOfMeasurement} from "../../data/unit-of-measurement/unit.of.measurement";
import {Sort} from "../../util/sort";
import { map } from "rxjs/operators";
import { UnitOfMeasurements } from "../../data/unit-of-measurement/unit.of.measurements";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";

export class UnitOfMeasurementOrchestrator {

  private unitOfMeasurementRepository: UnitOfMeasurementRepository;

  constructor(options?: RepositoryKind) {
    this.unitOfMeasurementRepository = createUnitOfMeasurementRepository(options);
  }

  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement> {
    return this.unitOfMeasurementRepository.addUnitOfMeasurement(unitOfMeasurement, headerOptions);
  }

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement[]> {
    return this.unitOfMeasurementRepository.findUnitOfMeasurements(searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurements> {
    return this.unitOfMeasurementRepository.getUnitOfMeasurements(pageNumber, pageSize, sort, headerOptions);
  }

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.unitOfMeasurementRepository.updateUnitOfMeasurement(unitOfMeasureId, unitOfMeasurement, headerOptions)
        .pipe(map(aff => aff.affected));
  }

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: HeaderBaseOptions): Observable<UnitOfMeasurement> {
    return this.unitOfMeasurementRepository.getUnitOfMeasurementById(unitOfMeasurementId, headerOptions);
  }

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: HeaderBaseOptions): Observable<number> {
    return this.unitOfMeasurementRepository.deleteUnitOfMeasurement(unitOfMeasurementId, headerOptions)
        .pipe(map(aff => aff.affected));
  }

}
