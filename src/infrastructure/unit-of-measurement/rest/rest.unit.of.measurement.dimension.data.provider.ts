import {UnitOfMeasurementDimensionDataProvider} from "../../../port/unit.of.measurement.dimension.data.provider";
import {UnitOfMeasurementDimension} from "../../../domain/model/unit-of-measurement/unit.of.measurement.dimension";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestUnitOfMeasurementDimensionDataProvider implements UnitOfMeasurementDimensionDataProvider {
  addUnitOfMeasurementDimension(unitOfMeasurementDimension: UnitOfMeasurementDimension, headerOptions?: any): Observable<UnitOfMeasurementDimension> {
    return undefined;
  }

  deleteUnitOfMeasurementDimension(unitOfMeasurementDimensionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findUnitOfMeasurementDimensions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementDimension[]> {
    return undefined;
  }

  getUnitOfMeasurementDimensionById(unitOfMeasurementDimensionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementDimension> {
    return undefined;
  }

  getUnitOfMeasurementDimensionCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getUnitOfMeasurementDimensions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementDimension[]>> {
    return undefined;
  }

  updateUnitOfMeasurementDimension(unitOfMeasurementDimension: UnitOfMeasurementDimension, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}