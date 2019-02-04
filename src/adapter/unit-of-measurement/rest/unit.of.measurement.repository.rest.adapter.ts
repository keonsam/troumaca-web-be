import {UnitOfMeasurementRepository} from "../../../repository/unit.of.measurement.repository";
import {UnitOfMeasurement} from "../../../data/unit-of-measurement/unit.of.measurement";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class UnitOfMeasurementRepositoryRestAdapter implements UnitOfMeasurementRepository {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<UnitOfMeasurement> {
    return undefined;
  }

  deleteUnitOfMeasurement(unitOfMeasurementId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findUnitOfMeasurements(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurement[]> {
    return undefined;
  }

  getUnitOfMeasurementById(unitOfMeasurementId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurement> {
    return undefined;
  }

  getUnitOfMeasurementCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getUnitOfMeasurements(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurement[]>> {
    return undefined;
  }

  updateUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}