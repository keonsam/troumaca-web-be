import {Observable} from "rxjs";
import {UnitOfMeasurementRepository} from "../repository/unit.of.measurement.repository";
import {createUnitOfMeasurementRepository} from "../adapter/unit-of-measurement/unit.of.measurement.repository.factory";
import {Affect} from "../data/affect";
import {UnitOfMeasurement} from "../data/unit-of-measurement/unit.of.measurement";
import {Page} from "../util/page";
import {Sort} from "../util/sort";

export class UnitOfMeasurementOrchestrator {

  private assetNameTypeRepository: UnitOfMeasurementRepository;

  constructor(options?: any) {
    this.assetNameTypeRepository = createUnitOfMeasurementRepository(options);
  }

  addUnitOfMeasurement(assetNameType: UnitOfMeasurement, headerOptions?:any): Observable<UnitOfMeasurement> {
    return this.assetNameTypeRepository.addUnitOfMeasurement(assetNameType, headerOptions);
  }

  findUnitOfMeasurements(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<UnitOfMeasurement[]> {
    return this.assetNameTypeRepository.findUnitOfMeasurements(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurements(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurement[]>> {
    return this.assetNameTypeRepository.getUnitOfMeasurements(ownerPartyId, pageNumber, pageSize, sort, headerOptions)
  }

  updateUnitOfMeasurement(assetNameType: UnitOfMeasurement, headerOptions?:any): Observable<Affect> {
    return this.assetNameTypeRepository.updateUnitOfMeasurement(assetNameType, headerOptions);
  }

  getUnitOfMeasurementById(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<UnitOfMeasurement> {
    return this.assetNameTypeRepository.getUnitOfMeasurementById(assetNameTypeId, ownerPartyId, headerOptions);
  }

  deleteUnitOfMeasurement(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return this.assetNameTypeRepository.deleteUnitOfMeasurement(assetNameTypeId, ownerPartyId, headerOptions);
  }

}