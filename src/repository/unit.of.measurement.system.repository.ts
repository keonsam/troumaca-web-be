import {UnitOfMeasurementSystem} from "../data/unit-of-measurement/unit.of.measurement.system";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface UnitOfMeasurementSystemRepository {
  addUnitOfMeasurementSystem(unitOfMeasurementSystem: UnitOfMeasurementSystem, headerOptions?: any): Observable<UnitOfMeasurementSystem>;

  updateUnitOfMeasurementSystem(unitOfMeasurementSystem: UnitOfMeasurementSystem, headerOptions?: any): Observable<Affect>;

  deleteUnitOfMeasurementSystem(unitOfMeasurementSystemId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findUnitOfMeasurementSystems(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementSystem[]>;

  getUnitOfMeasurementSystems(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementSystem[]>>;

  getUnitOfMeasurementSystemCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getUnitOfMeasurementSystemById(unitOfMeasurementSystemId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementSystem>;
}
