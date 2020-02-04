import {UnitOfMeasurementConversion} from "../domain/model/unit-of-measurement/unit.of.measurement.conversion";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface UnitOfMeasurementConversionDataProvider {
  addUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<UnitOfMeasurementConversion>;

  updateUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<Affect>;

  deleteUnitOfMeasurementConversion(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findUnitOfMeasurementConversions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementConversion[]>;

  getUnitOfMeasurementConversions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementConversion[]>>;

  getUnitOfMeasurementConversionCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getUnitOfMeasurementConversionById(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementConversion>;
}
