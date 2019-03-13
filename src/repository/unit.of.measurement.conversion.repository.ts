import {UnitOfMeasurementConversion} from "../data/unit-of-measurement/unit.of.measurement.conversion";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface UnitOfMeasurementConversionRepository {
  addUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<UnitOfMeasurementConversion>;

  updateUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<Affect>;

  deleteUnitOfMeasurementConversion(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findUnitOfMeasurementConversions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementConversion[]>;

  getUnitOfMeasurementConversions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementConversion[]>>;

  getUnitOfMeasurementConversionCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getUnitOfMeasurementConversionById(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementConversion>;
}
