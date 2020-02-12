import {UnitOfMeasurementConversionDataProvider} from "../../../port/unit.of.measurement.conversion.data.provider";
import {UnitOfMeasurementConversion} from "../../../domain/model/unit-of-measurement/unit.of.measurement.conversion";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestUnitOfMeasurementConversionDataProvider implements UnitOfMeasurementConversionDataProvider {
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