import {UnitOfMeasurementSystemDataProvider} from "../../../port/unit.of.measurement.system.data.provider";
import {UnitOfMeasurementSystem} from "../../../domain/model/unit-of-measurement/unit.of.measurement.system";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestUnitOfMeasurementSystemDataProvider implements UnitOfMeasurementSystemDataProvider {
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