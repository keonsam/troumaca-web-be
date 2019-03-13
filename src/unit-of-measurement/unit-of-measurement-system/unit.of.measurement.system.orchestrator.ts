import {Observable} from "rxjs";
import {UnitOfMeasurementSystemRepository} from "../../repository/unit.of.measurement.system.repository";
import {createUnitOfMeasurementSystemRepository} from "../../adapter/unit-of-measurement/unit.of.measurement.system.repository.factory";
import {Affect} from "../../data/affect";
import {UnitOfMeasurementSystem} from "../../data/unit-of-measurement/unit.of.measurement.system";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class UnitOfMeasurementSystemOrchestrator {

  private assetNameTypeRepository: UnitOfMeasurementSystemRepository;

  constructor(options?: any) {
    this.assetNameTypeRepository = createUnitOfMeasurementSystemRepository(options);
  }

  addUnitOfMeasurementSystem(assetNameType: UnitOfMeasurementSystem, headerOptions?:any): Observable<UnitOfMeasurementSystem> {
    return this.assetNameTypeRepository.addUnitOfMeasurementSystem(assetNameType, headerOptions);
  }

  findUnitOfMeasurementSystems(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<UnitOfMeasurementSystem[]> {
    return this.assetNameTypeRepository.findUnitOfMeasurementSystems(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurementSystems(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementSystem[]>> {
    return this.assetNameTypeRepository.getUnitOfMeasurementSystems(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateUnitOfMeasurementSystem(assetNameType: UnitOfMeasurementSystem, headerOptions?:any): Observable<Affect> {
    return this.assetNameTypeRepository.updateUnitOfMeasurementSystem(assetNameType, headerOptions);
  }

  getUnitOfMeasurementSystemById(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<UnitOfMeasurementSystem> {
    return this.assetNameTypeRepository.getUnitOfMeasurementSystemById(assetNameTypeId, ownerPartyId, headerOptions);
  }

  deleteUnitOfMeasurementSystem(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return this.assetNameTypeRepository.deleteUnitOfMeasurementSystem(assetNameTypeId, ownerPartyId, headerOptions);
  }

}