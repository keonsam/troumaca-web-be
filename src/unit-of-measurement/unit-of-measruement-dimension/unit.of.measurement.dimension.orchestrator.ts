import {Observable} from "rxjs";
import {UnitOfMeasurementDimensionRepository} from "../../repository/unit.of.measurement.dimension.repository";
import {createUnitOfMeasurementDimensionRepository} from "../../adapter/unit-of-measurement/unit.of.measurement.dimension.repository.factory";
import {Affect} from "../../data/affect";
import {UnitOfMeasurementDimension} from "../../data/unit-of-measurement/unit.of.measurement.dimension";
import {Page} from "../../util/page";
import {Sort} from "../../util/sort";

export class UnitOfMeasurementDimensionOrchestrator {

  private unitOfMeasurementDimensionRepository: UnitOfMeasurementDimensionRepository;

  constructor(options?: any) {
    this.unitOfMeasurementDimensionRepository = createUnitOfMeasurementDimensionRepository(options);
  }

  addUnitOfMeasurementDimension(assetNameType: UnitOfMeasurementDimension, headerOptions?: any): Observable<UnitOfMeasurementDimension> {
    return this.unitOfMeasurementDimensionRepository.addUnitOfMeasurementDimension(assetNameType, headerOptions);
  }

  findUnitOfMeasurementDimensions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementDimension[]> {
    return this.unitOfMeasurementDimensionRepository.findUnitOfMeasurementDimensions(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurementDimensions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementDimension[]>> {
    return this.unitOfMeasurementDimensionRepository.getUnitOfMeasurementDimensions(ownerPartyId, pageNumber, pageSize, sort, headerOptions);
  }

  updateUnitOfMeasurementDimension(assetNameType: UnitOfMeasurementDimension, headerOptions?: any): Observable<Affect> {
    return this.unitOfMeasurementDimensionRepository.updateUnitOfMeasurementDimension(assetNameType, headerOptions);
  }

  getUnitOfMeasurementDimensionById(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementDimension> {
    return this.unitOfMeasurementDimensionRepository.getUnitOfMeasurementDimensionById(assetNameTypeId, ownerPartyId, headerOptions);
  }

  deleteUnitOfMeasurementDimension(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.unitOfMeasurementDimensionRepository.deleteUnitOfMeasurementDimension(assetNameTypeId, ownerPartyId, headerOptions);
  }

}