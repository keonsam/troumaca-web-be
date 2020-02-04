import {Observable} from "rxjs";
import {UnitOfMeasurementSystemDataProvider} from "../../../port/unit.of.measurement.system.data.provider";
import {createUnitOfMeasurementSystemRepository} from "../../../infrastructure/unit-of-measurement/unit.of.measurement.system.data.provider.factory";
import {Affect} from "../../../domain/model/affect";
import {UnitOfMeasurementSystem} from "../../../domain/model/unit-of-measurement/unit.of.measurement.system";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class UnitOfMeasurementSystemOrchestrator {

  private assetNameTypeRepository: UnitOfMeasurementSystemDataProvider;

  constructor(options?: any) {
    this.assetNameTypeRepository = createUnitOfMeasurementSystemRepository(options);
  }

  addUnitOfMeasurementSystem(assetNameType: UnitOfMeasurementSystem, headerOptions?: any): Observable<UnitOfMeasurementSystem> {
    return this.assetNameTypeRepository.addUnitOfMeasurementSystem(assetNameType, headerOptions);
  }

  findUnitOfMeasurementSystems(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementSystem[]> {
    return this.assetNameTypeRepository.findUnitOfMeasurementSystems(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurementSystems(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementSystem[]>> {
    return this.assetNameTypeRepository.getUnitOfMeasurementSystems(ownerPartyId, pageNumber, pageSize, sort, headerOptions);
  }

  updateUnitOfMeasurementSystem(assetNameType: UnitOfMeasurementSystem, headerOptions?: any): Observable<Affect> {
    return this.assetNameTypeRepository.updateUnitOfMeasurementSystem(assetNameType, headerOptions);
  }

  getUnitOfMeasurementSystemById(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementSystem> {
    return this.assetNameTypeRepository.getUnitOfMeasurementSystemById(assetNameTypeId, ownerPartyId, headerOptions);
  }

  deleteUnitOfMeasurementSystem(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.assetNameTypeRepository.deleteUnitOfMeasurementSystem(assetNameTypeId, ownerPartyId, headerOptions);
  }

}
