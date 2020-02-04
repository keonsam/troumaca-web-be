import {UnitOfMeasurementDimension} from "../domain/model/unit-of-measurement/unit.of.measurement.dimension";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";

export interface UnitOfMeasurementDimensionDataProvider {
  addUnitOfMeasurementDimension(unitOfMeasurementDimension: UnitOfMeasurementDimension, headerOptions?: any): Observable<UnitOfMeasurementDimension>;

  updateUnitOfMeasurementDimension(unitOfMeasurementDimension: UnitOfMeasurementDimension, headerOptions?: any): Observable<Affect>;

  deleteUnitOfMeasurementDimension(unitOfMeasurementDimensionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findUnitOfMeasurementDimensions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementDimension[]>;

  getUnitOfMeasurementDimensions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementDimension[]>>;

  getUnitOfMeasurementDimensionCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getUnitOfMeasurementDimensionById(unitOfMeasurementDimensionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementDimension>;
}
