import {UnitOfMeasureDimensionRepository} from "../../repository/unit.of.measure.dimension.repository";
import {UnitOfMeasureDimension} from "../../data/unit-of-measure/unit.of.measure.dimension";
import {Observable, Observer} from "rxjs";
import {unitOfMeasureDimensions} from "../../db";

export class UnitOfMeasureDimensionRepositoryNeDbAdapter implements UnitOfMeasureDimensionRepository {
  findUnitOfMeasureDimension(searchStr: string, pageSize: number): Observable<UnitOfMeasureDimension[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<UnitOfMeasureDimension[]>) {
      unitOfMeasureDimensions.find(query).limit(100).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getUnitOfMeasureDimensionById(unitOfMeasureDimensionId: string): Observable<UnitOfMeasureDimension> {
    const query = {
      "unitOfMeasureDimensionId": unitOfMeasureDimensionId
    };
    return Observable.create(function (observer: Observer<UnitOfMeasureDimension>) {
      unitOfMeasureDimensions.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  // USED BY OTHER REPOS

  getUnitOfMeasureDimensionsByIds(unitOfMeasureDimensionIds: string[]): Observable<UnitOfMeasureDimension[]> {
    return Observable.create((observer: Observer<UnitOfMeasureDimension[]>) => {
      unitOfMeasureDimensions.find({unitOfMeasureDimensionId: {$in: unitOfMeasureDimensionIds}}, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }


}