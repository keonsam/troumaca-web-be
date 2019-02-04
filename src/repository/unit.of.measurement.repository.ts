import {UnitOfMeasurement} from "../data/unit-of-measurement/unit.of.measurement";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface UnitOfMeasurementRepository {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<UnitOfMeasurement>;

  updateUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<Affect>;

  deleteUnitOfMeasurement(unitOfMeasurementId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findUnitOfMeasurements(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurement[]>;

  getUnitOfMeasurements(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurement[]>>;

  getUnitOfMeasurementCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getUnitOfMeasurementById(unitOfMeasurementId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurement>;
}
