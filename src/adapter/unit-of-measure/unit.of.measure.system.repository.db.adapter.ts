import {UnitOfMeasureSystemRepository} from "../../repository/unit.of.measure.system.repository";
import {UnitOfMeasureSystem} from "../../data/unit-of-measure/unit.of.measure.system";
import {Observable, Observer} from "rxjs";
import {unitOfMeasureSystems} from "../../db";

export class UnitOfMeasureSystemRepositoryNeDbAdapter implements UnitOfMeasureSystemRepository {
  findUnitOfMeasureSystem(searchStr: string, pageSize: number): Observable<UnitOfMeasureSystem[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<UnitOfMeasureSystem[]>) {
      unitOfMeasureSystems.find(query).limit(100).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getUnitOfMeasureSystemById(unitOfMeasureSystemId: string): Observable<UnitOfMeasureSystem> {
    const query = {
      "unitOfMeasureSystemId": unitOfMeasureSystemId
    };
    return Observable.create(function (observer: Observer<UnitOfMeasureSystem>) {
      unitOfMeasureSystems.findOne(query, function (err: any, doc: any) {
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

  getUnitOfMeasureSystemsByIds(unitOfMeasureSystemIds: string[]): Observable<UnitOfMeasureSystem[]> {
    return Observable.create((observer: Observer<UnitOfMeasureSystem[]>) => {
      unitOfMeasureSystems.find({unitOfMeasureSystemId: {$in: unitOfMeasureSystemIds}}, function (err: any, docs: any) {
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