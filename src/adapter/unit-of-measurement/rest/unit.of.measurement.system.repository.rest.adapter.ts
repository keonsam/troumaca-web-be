import {UnitOfMeasurementSystemRepository} from "../../../repository/unit.of.measurement.system.repository";
import {UnitOfMeasurementSystem} from "../../../data/unit-of-measurement/unit.of.measurement.system";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class UnitOfMeasurementSystemRepositoryRestAdapter implements UnitOfMeasurementSystemRepository {
  addUnitOfMeasurementSystem(unitOfMeasurementSystem: UnitOfMeasurementSystem, headerOptions?: any): Observable<UnitOfMeasurementSystem> {
    return undefined;
  }

  deleteUnitOfMeasurementSystem(unitOfMeasurementSystemId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findUnitOfMeasurementSystems(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementSystem[]> {
    return undefined;
  }

  getUnitOfMeasurementSystemById(unitOfMeasurementSystemId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementSystem> {
    return undefined;
  }

  getUnitOfMeasurementSystemCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getUnitOfMeasurementSystems(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementSystem[]>> {
    return undefined;
  }

  updateUnitOfMeasurementSystem(unitOfMeasurementSystem: UnitOfMeasurementSystem, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}