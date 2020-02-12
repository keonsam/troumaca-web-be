import {Observable} from "rxjs";
import {UnitOfMeasurementConversionDataProvider} from "../../../port/unit.of.measurement.conversion.data.provider";
import {createUnitOfMeasurementConversionRepository} from "../../../infrastructure/unit-of-measurement/unit.of.measurement.conversion.data.provider.factory";
import {Affect} from "../../../domain/model/affect";
import {UnitOfMeasurementConversion} from "../../../domain/model/unit-of-measurement/unit.of.measurement.conversion";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class UnitOfMeasurementConversionOrchestrator {

  private unitOfMeasurementConversionRepository: UnitOfMeasurementConversionDataProvider;

  constructor(options?: any) {
    this.unitOfMeasurementConversionRepository = createUnitOfMeasurementConversionRepository(options);
  }

  addUnitOfMeasurementConversion(assetNameType: UnitOfMeasurementConversion, headerOptions?: any): Observable<UnitOfMeasurementConversion> {
    return this.unitOfMeasurementConversionRepository.addUnitOfMeasurementConversion(assetNameType, headerOptions);
  }

  findUnitOfMeasurementConversions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementConversion[]> {
    return this.unitOfMeasurementConversionRepository.findUnitOfMeasurementConversions(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getUnitOfMeasurementConversions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementConversion[]>> {
    return this.unitOfMeasurementConversionRepository.getUnitOfMeasurementConversions(ownerPartyId, pageNumber, pageSize, sort, headerOptions);
  }

  updateUnitOfMeasurementConversion(assetNameType: UnitOfMeasurementConversion, headerOptions?: any): Observable<Affect> {
    return this.unitOfMeasurementConversionRepository.updateUnitOfMeasurementConversion(assetNameType, headerOptions);
  }

  getUnitOfMeasurementConversionById(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementConversion> {
    return this.unitOfMeasurementConversionRepository.getUnitOfMeasurementConversionById(assetNameTypeId, ownerPartyId, headerOptions);
  }

  deleteUnitOfMeasurementConversion(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.unitOfMeasurementConversionRepository.deleteUnitOfMeasurementConversion(assetNameTypeId, ownerPartyId, headerOptions);
  }

}
