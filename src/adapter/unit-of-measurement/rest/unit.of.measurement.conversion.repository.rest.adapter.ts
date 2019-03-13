import {UnitOfMeasurementConversionRepository} from "../../../repository/unit.of.measurement.conversion.repository";
import {UnitOfMeasurementConversion} from "../../../data/unit-of-measurement/unit.of.measurement.conversion";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class UnitOfMeasurementConversionRepositoryRestAdapter implements UnitOfMeasurementConversionRepository {
  addUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<UnitOfMeasurementConversion> {
    return undefined;
  }

  deleteUnitOfMeasurementConversion(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findUnitOfMeasurementConversions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementConversion[]> {
    return undefined;
  }

  getUnitOfMeasurementConversionById(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementConversion> {
    return undefined;
  }

  getUnitOfMeasurementConversionCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getUnitOfMeasurementConversions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementConversion[]>> {
    return undefined;
  }

  updateUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}